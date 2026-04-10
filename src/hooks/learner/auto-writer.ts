/**
 * Auto-writer for high-confidence skill extraction.
 * Bypasses user confirmation when confidence >= 85.
 * Rate-limited to max 3 per session, 5 messages between creations.
 */

import { createHash } from 'crypto';
import { writeSkill, checkDuplicateTriggers } from './writer.js';
import { DEBUG_ENABLED } from './constants.js';
import type { SkillExtractionRequest } from './types.js';

/**
 * Minimal pattern interface for auto-creation.
 * Matches the shape of PatternDetection from auto-learner.ts
 * without creating a circular dependency.
 */
export interface AutoCreatablePattern {
  id: string;
  problem: string;
  solution: string;
  confidence: number;
  occurrences: number;
  firstSeen: number;
  lastSeen: number;
  suggestedTriggers: string[];
  suggestedTags: string[];
}

// ============================================================================
// Constants
// ============================================================================

/** Minimum confidence score for auto-creation (no user confirmation) */
const AUTO_THRESHOLD = 85;

/** Maximum auto-created skills per session */
const MAX_PER_SESSION = 3;

/** Minimum messages between auto-creations */
const MIN_MESSAGE_GAP = 5;

// ============================================================================
// Session State
// ============================================================================

let sessionAutoCreationCount = 0;
let lastAutoCreationMessage = 0;
let currentMessageCount = 0;

/** Content hashes of auto-created skills this session (for deduplication) */
const sessionContentHashes = new Set<string>();

// ============================================================================
// Public API
// ============================================================================

/**
 * Increment the message counter. Call on each message cycle.
 */
export function incrementMessageCount(): void {
  currentMessageCount++;
}

/**
 * Check if auto-creation is allowed by rate limits.
 */
export function canAutoCreate(): boolean {
  if (sessionAutoCreationCount >= MAX_PER_SESSION) return false;
  if (currentMessageCount - lastAutoCreationMessage < MIN_MESSAGE_GAP) return false;
  return true;
}

/**
 * Check if a pattern should be auto-created (confidence + rate limits).
 */
export function shouldAutoCreate(confidence: number): boolean {
  return confidence >= AUTO_THRESHOLD && canAutoCreate();
}

/**
 * Record that an auto-creation occurred.
 */
export function recordAutoCreation(): void {
  sessionAutoCreationCount++;
  lastAutoCreationMessage = currentMessageCount;
}

/**
 * Reset all session state (e.g., on session end).
 */
export function resetSession(): void {
  sessionAutoCreationCount = 0;
  lastAutoCreationMessage = 0;
  currentMessageCount = 0;
  sessionContentHashes.clear();
}

/**
 * Get auto-creation statistics for the current session.
 */
export function getAutoCreationStats(): { count: number; max: number; remaining: number } {
  return {
    count: sessionAutoCreationCount,
    max: MAX_PER_SESSION,
    remaining: MAX_PER_SESSION - sessionAutoCreationCount,
  };
}

/**
 * Generate a content hash for deduplication against session-created skills.
 */
function generateContentHash(problem: string, solution: string): string {
  const normalized = `${problem.toLowerCase().trim()}::${solution.toLowerCase().trim()}`;
  return createHash('sha256').update(normalized).digest('hex').slice(0, 16);
}

/**
 * Check if a skill with identical or very similar content was already auto-created this session.
 */
export function isDuplicateInSession(problem: string, solution: string): boolean {
  const hash = generateContentHash(problem, solution);
  return sessionContentHashes.has(hash);
}

/**
 * Check if a skill with overlapping triggers (>50%) already exists on disk.
 */
export function isDuplicateOnDisk(triggers: string[], projectRoot: string | null): boolean {
  const { isDuplicate } = checkDuplicateTriggers(triggers, projectRoot);
  return isDuplicate;
}

/**
 * Auto-create a skill from a detected pattern.
 * Writes to `.omc/skills/` (project-scoped only).
 *
 * Returns the file path on success, null on failure.
 */
export function autoCreateSkill(
  pattern: AutoCreatablePattern,
  projectRoot: string | null,
): string | null {
  // Validate project root exists (auto-created skills are project-scoped only)
  if (!projectRoot) {
    if (DEBUG_ENABLED) {
      console.error('[learner:auto-writer] Cannot auto-create skill without project root');
    }
    return null;
  }

  // Check session deduplication
  if (isDuplicateInSession(pattern.problem, pattern.solution)) {
    if (DEBUG_ENABLED) {
      console.log('[learner:auto-writer] Skipping duplicate (session): %s', pattern.id);
    }
    return null;
  }

  // Check disk deduplication (>50% trigger overlap)
  if (isDuplicateOnDisk(pattern.suggestedTriggers, projectRoot)) {
    if (DEBUG_ENABLED) {
      console.log('[learner:auto-writer] Skipping duplicate (disk): %s', pattern.id);
    }
    return null;
  }

  // Generate a descriptive name from the problem
  const problemWords = pattern.problem.split(/\s+/).slice(0, 6).join(' ');
  const skillName = problemWords.length > 50
    ? problemWords.slice(0, 50) + '...'
    : problemWords;

  // Build extraction request (project-scoped only)
  const request: SkillExtractionRequest = {
    problem: pattern.problem,
    solution: pattern.solution,
    triggers: pattern.suggestedTriggers,
    tags: pattern.suggestedTags,
    targetScope: 'project',
  };

  // Write the skill
  const result = writeSkill(request, projectRoot, skillName);

  if (result.success && result.path) {
    // Track in session
    const hash = generateContentHash(pattern.problem, pattern.solution);
    sessionContentHashes.add(hash);
    recordAutoCreation();

    if (DEBUG_ENABLED) {
      console.log(
        '[learner:auto-writer] Auto-created skill: %s (confidence: %d, path: %s)',
        skillName,
        pattern.confidence,
        result.path,
      );
    }

    return result.path;
  }

  if (DEBUG_ENABLED && result.error) {
    console.error('[learner:auto-writer] Failed to auto-create skill: %s', result.error);
  }

  return null;
}
