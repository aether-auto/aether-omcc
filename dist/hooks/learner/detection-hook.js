/**
 * Detection Hook
 *
 * Integrates skill detection into the message flow.
 */
import { detectExtractableMoment, shouldPromptExtraction, generateExtractionPrompt } from './detector.js';
import { isLearnerEnabled } from './index.js';
import { shouldAutoCreate, autoCreateSkill, incrementMessageCount } from './auto-writer.js';
import { extractTriggers } from './auto-learner.js';
import { DEBUG_ENABLED } from './constants.js';
const DEFAULT_CONFIG = {
    promptThreshold: 60,
    promptCooldown: 5,
    enabled: true,
};
/**
 * Workaround signal phrases that indicate non-obvious solutions.
 */
const WORKAROUND_SIGNALS = [
    'instead of',
    'workaround',
    'the trick is',
    'counterintuitively',
    'surprisingly',
    'unexpectedly',
    'turned out',
    'it turns out',
];
const sessionStates = new Map();
/**
 * Get or create session state.
 */
function getSessionState(sessionId) {
    if (!sessionStates.has(sessionId)) {
        sessionStates.set(sessionId, {
            messagesSincePrompt: 0,
            lastDetection: null,
            promptedCount: 0,
            consecutiveToolFailures: 0,
            autoCreatedPaths: [],
        });
    }
    return sessionStates.get(sessionId);
}
/**
 * Process assistant response for skill detection.
 * Returns prompt text if extraction should be suggested, null otherwise.
 */
export function processResponseForDetection(assistantMessage, userMessage, sessionId, config = {}, projectRoot) {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config };
    if (!mergedConfig.enabled || !isLearnerEnabled()) {
        return null;
    }
    const state = getSessionState(sessionId);
    state.messagesSincePrompt++;
    // Increment auto-writer message counter
    incrementMessageCount();
    // Detect extractable moment
    const detection = detectExtractableMoment(assistantMessage, userMessage);
    state.lastDetection = detection;
    // Boost confidence for workaround signals
    let adjustedConfidence = detection.confidence;
    if (detection.detected) {
        const lowerMessage = assistantMessage.toLowerCase();
        let workaroundSignalCount = 0;
        for (const signal of WORKAROUND_SIGNALS) {
            if (lowerMessage.includes(signal)) {
                workaroundSignalCount++;
            }
        }
        if (workaroundSignalCount >= 2) {
            adjustedConfidence = Math.min(adjustedConfidence + 10, 100);
        }
    }
    // Auto-create if confidence is high enough and rate limits allow
    if (detection.detected && shouldAutoCreate(adjustedConfidence) && projectRoot) {
        const pattern = {
            id: `auto-${Date.now().toString(36)}`,
            problem: userMessage || assistantMessage.slice(0, 200),
            solution: assistantMessage,
            confidence: adjustedConfidence,
            occurrences: 1,
            firstSeen: Date.now(),
            lastSeen: Date.now(),
            suggestedTriggers: detection.suggestedTriggers.length > 0
                ? detection.suggestedTriggers
                : extractTriggers(userMessage || '', assistantMessage),
            suggestedTags: [],
        };
        const createdPath = autoCreateSkill(pattern, projectRoot);
        if (createdPath) {
            state.autoCreatedPaths.push(createdPath);
            if (DEBUG_ENABLED) {
                console.log('[learner:detection-hook] Auto-created skill at: %s', createdPath);
            }
            // Don't prompt the user — auto-creation is silent
            return null;
        }
    }
    // Check cooldown for suggestion prompting
    if (state.messagesSincePrompt < mergedConfig.promptCooldown) {
        return null;
    }
    // Check if we should prompt (existing behavior for lower confidence)
    if (shouldPromptExtraction(detection, mergedConfig.promptThreshold)) {
        state.messagesSincePrompt = 0;
        state.promptedCount++;
        return generateExtractionPrompt(detection);
    }
    return null;
}
/**
 * Record a tool use failure (for auto-fix pattern detection).
 * Call when a tool use fails (PostToolUseFailure).
 */
export function recordToolFailure(sessionId) {
    const state = getSessionState(sessionId);
    state.consecutiveToolFailures++;
}
/**
 * Record a tool use success (for auto-fix pattern detection).
 * Call when a tool use succeeds after failures (PostToolUse).
 * Returns true if this was a failure-then-success sequence.
 */
export function recordToolSuccess(sessionId) {
    const state = getSessionState(sessionId);
    const hadFailures = state.consecutiveToolFailures > 0;
    state.consecutiveToolFailures = 0;
    return hadFailures;
}
/**
 * Get list of auto-created skill paths for a session.
 */
export function getAutoCreatedPaths(sessionId) {
    return sessionStates.get(sessionId)?.autoCreatedPaths ?? [];
}
/**
 * Get the last detection result for a session.
 */
export function getLastDetection(sessionId) {
    return sessionStates.get(sessionId)?.lastDetection || null;
}
/**
 * Clear detection state for a session.
 */
export function clearDetectionState(sessionId) {
    sessionStates.delete(sessionId);
}
/**
 * Get detection statistics for a session.
 */
export function getDetectionStats(sessionId) {
    const state = sessionStates.get(sessionId);
    if (!state) {
        return {
            messagesSincePrompt: 0,
            promptedCount: 0,
            lastDetection: null,
        };
    }
    return {
        messagesSincePrompt: state.messagesSincePrompt,
        promptedCount: state.promptedCount,
        lastDetection: state.lastDetection,
    };
}
//# sourceMappingURL=detection-hook.js.map