/**
 * EXECUTION Stage Adapter
 *
 * Wraps team-based and solo execution into the pipeline stage adapter interface.
 *
 * When execution='team', delegates to the /team orchestrator for multi-worker execution.
 * When execution='solo', uses direct executor agents in the current session.
 */
import { resolveAutopilotPlanPath } from "../../../config/plan-output.js";
export const EXECUTION_COMPLETION_SIGNAL = "PIPELINE_EXECUTION_COMPLETE";
export const executionAdapter = {
    id: "execution",
    name: "Execution",
    completionSignal: EXECUTION_COMPLETION_SIGNAL,
    shouldSkip(_config) {
        // Execution stage is never skipped - it's the core of the pipeline
        return false;
    },
    getPrompt(context) {
        const planPath = context.planPath || resolveAutopilotPlanPath();
        const isTeam = context.config.execution === "team";
        if (isTeam) {
            return `## PIPELINE STAGE: EXECUTION (Team Mode — TODO-Driven)

Execute TODOs iteratively in dependency order using multi-worker team execution.

### Setup

1. Read the TODO index at: \`.omc/todos/INDEX.md\` — this is the dependency DAG
2. Read the implementation plan at: \`${planPath}\` for additional context
3. If \`.ui-specs/\` exists, note it for frontend agents
4. If \`.omc/research/\` exists, note it for reference implementations

### TODO-Driven Execution Loop

Process TODOs in dependency order, dispatching independent TODOs in parallel:

\`\`\`
REPEAT:
  1. Read .omc/todos/INDEX.md → identify all TODOs with status: pending
  2. Find UNBLOCKED TODOs: pending TODOs whose depends_on are all done
  3. If no unblocked TODOs and some still pending → report circular dependency
  4. If all TODOs are done → emit completion signal
  5. DISPATCH all unblocked TODOs IN PARALLEL:
     - Create team with TeamCreate
     - For each unblocked TODO: read .omc/todos/TODO-NNN.md
     - Spawn specialist agents based on scope tags:
       [frontend] → frontend-dev | [backend] → backend-dev | [database] → db-dev
       Multiple scopes → spawn each specialist IN PARALLEL
     - Each agent receives: acceptance criteria, description, reference implementations
  6. VERIFY each completed TODO against its acceptance criteria
  7. Update TODO frontmatter: status: done (or status: blocked after 3 failures)
  8. Update .omc/todos/INDEX.md with new statuses
  9. GOTO step 1 (next iteration picks up newly unblocked TODOs)
\`\`\`

### Agent Selection

Match agent types to TODO scope tags:

**Specialist Agents (prefer for scoped TODOs):**
- \`[frontend]\` scope: \`frontend-dev\` with \`model="sonnet"\`
- \`[backend]\` scope: \`backend-dev\` with \`model="sonnet"\`
- \`[database]\` scope: \`db-dev\` with \`model="sonnet"\`

**General Agents:**
- \`[config]\` or mixed scope: \`executor\` with \`model="sonnet"\`
- Simple single-file tasks: \`executor\` with \`model="haiku"\`
- Complex cross-cutting: \`executor\` with \`model="opus"\`
- Build/test failures: \`debugger\` with \`model="sonnet"\`

### Failure Handling

- If a TODO fails 3 times: mark \`status: blocked\`, log error, continue with other TODOs
- If a blocked TODO is on the critical path: report to user via AskUserQuestion
- If all remaining TODOs are blocked: stop and present blockers

### Progress Reporting

After each loop iteration:
\`\`\`
Execution Progress: {completed}/{total} TODOs
  Completed this round: TODO-003, TODO-005
  Now unblocked: TODO-008, TODO-009
  Blocked: {count} | Remaining: {count}
\`\`\`

### Completion

When ALL TODOs in .omc/todos/ have status: done (or blocked with user acknowledgment):

Signal: ${EXECUTION_COMPLETION_SIGNAL}
`;
        }
        // Solo execution mode
        return `## PIPELINE STAGE: EXECUTION (Solo Mode — TODO-Driven)

Execute TODOs iteratively in dependency order using single-session execution.

### Setup

1. Read the TODO index at: \`.omc/todos/INDEX.md\` — this is the dependency DAG
2. Read the implementation plan at: \`${planPath}\` for additional context
3. If \`.ui-specs/\` exists, note it for frontend tasks
4. If \`.omc/research/\` exists, note it for reference implementations

### TODO-Driven Execution Loop

Process TODOs in dependency order, with limited parallelism via background agents:

\`\`\`
REPEAT:
  1. Read .omc/todos/INDEX.md → identify all TODOs with status: pending
  2. Find UNBLOCKED TODOs: pending TODOs whose depends_on are all done
  3. If no unblocked TODOs and some still pending → report circular dependency
  4. If all TODOs are done → emit completion signal
  5. For each unblocked TODO:
     - Read .omc/todos/TODO-NNN.md for full details
     - Spawn agent based on scope: frontend-dev, backend-dev, db-dev, or executor
     - Run independent TODOs as background agents for limited parallelism
  6. VERIFY each completed TODO against its acceptance criteria
  7. Update TODO frontmatter: status: done (or status: blocked after 3 failures)
  8. Update .omc/todos/INDEX.md
  9. GOTO step 1
\`\`\`

### Agent Spawning by TODO Scope

\`\`\`
// [frontend] scope
Task(subagent_type="aether-omcc:frontend-dev", model="sonnet", prompt="Implement TODO-NNN: ...")

// [backend] scope
Task(subagent_type="aether-omcc:backend-dev", model="sonnet", prompt="Implement TODO-NNN: ...")

// [database] scope
Task(subagent_type="aether-omcc:db-dev", model="sonnet", prompt="Implement TODO-NNN: ...")

// [config] or complex cross-cutting
Task(subagent_type="aether-omcc:executor", model="opus", prompt="Implement TODO-NNN: ...")
\`\`\`

### Failure Handling

- If a TODO fails 3 times: mark \`status: blocked\`, log error, continue with others
- If blocked TODO is on the critical path: report to user

### Progress Reporting

After each loop iteration:
\`\`\`
Execution Progress: {completed}/{total} TODOs
  Completed this round: TODO-NNN
  Now unblocked: TODO-NNN
  Blocked: {count} | Remaining: {count}
\`\`\`

### Completion

When ALL TODOs in .omc/todos/ have status: done (or blocked with user acknowledgment):

Signal: ${EXECUTION_COMPLETION_SIGNAL}
`;
    },
};
//# sourceMappingURL=execution-adapter.js.map