/**
 * Auto-writer for high-confidence skill extraction.
 * Bypasses user confirmation when confidence >= 85.
 * Rate-limited to max 3 per session, 5 messages between creations.
 */
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
/**
 * Increment the message counter. Call on each message cycle.
 */
export declare function incrementMessageCount(): void;
/**
 * Check if auto-creation is allowed by rate limits.
 */
export declare function canAutoCreate(): boolean;
/**
 * Check if a pattern should be auto-created (confidence + rate limits).
 */
export declare function shouldAutoCreate(confidence: number): boolean;
/**
 * Record that an auto-creation occurred.
 */
export declare function recordAutoCreation(): void;
/**
 * Reset all session state (e.g., on session end).
 */
export declare function resetSession(): void;
/**
 * Get auto-creation statistics for the current session.
 */
export declare function getAutoCreationStats(): {
    count: number;
    max: number;
    remaining: number;
};
/**
 * Check if a skill with identical or very similar content was already auto-created this session.
 */
export declare function isDuplicateInSession(problem: string, solution: string): boolean;
/**
 * Check if a skill with overlapping triggers (>50%) already exists on disk.
 */
export declare function isDuplicateOnDisk(triggers: string[], projectRoot: string | null): boolean;
/**
 * Auto-create a skill from a detected pattern.
 * Writes to `.omc/skills/` (project-scoped only).
 *
 * Returns the file path on success, null on failure.
 */
export declare function autoCreateSkill(pattern: AutoCreatablePattern, projectRoot: string | null): string | null;
//# sourceMappingURL=auto-writer.d.ts.map