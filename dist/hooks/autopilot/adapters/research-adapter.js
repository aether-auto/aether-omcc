/**
 * Deep Research Stage Adapter
 *
 * Wraps the deep-research skill into the pipeline stage adapter interface.
 * This stage conducts multi-agent research using an orchestrator-worker pattern
 * to inform implementation decisions with real-world patterns and best practices.
 *
 * Smart detection heuristics are handled in the prompt — the orchestrator reads
 * the plan and decides based on complexity signals whether to run or skip.
 */
export const RESEARCH_COMPLETION_SIGNAL = "PIPELINE_RESEARCH_COMPLETE";
export const researchAdapter = {
    id: "research",
    name: "Deep Research",
    completionSignal: RESEARCH_COMPLETION_SIGNAL,
    shouldSkip(_config) {
        // Smart detection is handled in the prompt — the orchestrator reads the plan
        // and decides based on complexity heuristics.
        // Can be explicitly skipped via config or --skip-research flag.
        return false;
    },
    getPrompt(context) {
        return `## Stage: Deep Research

### Objective
Conduct multi-agent deep research to inform implementation decisions with real-world patterns and best practices.

### Smart Detection
First, analyze the plan complexity:
- Read the plan at: ${context.planPath || ".omc/plans/"}
- Count the number of tasks/features
- Identify the technology stack

**SKIP research if ALL of these are true:**
- Plan has fewer than 3 distinct tasks
- Uses only well-known, single technology (plain React, Express CRUD, etc.)
- No complex integrations (no real-time, payments, OAuth, etc.)
- No security-critical features

**RUN research if ANY of these are true:**
- 3+ different technologies in the stack
- Complex integrations (real-time, payments, OAuth/OIDC, file storage, etc.)
- Security-critical features (auth, permissions, data encryption)
- 5+ tasks in the plan
- Uses newer/less-documented frameworks

If skipping, emit ${RESEARCH_COMPLETION_SIGNAL} immediately.

### Research Protocol (if running)
1. Invoke /aether-omcc:deep-research skill
2. The skill will:
   a. Create a research plan with 5-10 specific questions
   b. Spawn parallel researcher agents (one per question)
   c. Collect and synthesize findings
   d. Write results to .omc/research/

### Completion
When research is complete (or skipped), emit: ${RESEARCH_COMPLETION_SIGNAL}
`;
    },
};
//# sourceMappingURL=research-adapter.js.map