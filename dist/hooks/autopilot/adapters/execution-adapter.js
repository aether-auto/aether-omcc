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
            return `## PIPELINE STAGE: EXECUTION (Team Mode — TODO-Driven, 3-Step Pipeline)

Execute TODOs iteratively in dependency order using a 3-step pipeline per TODO: Plan → Execute → Verify.

### Setup

1. Read the TODO index at: \`.omc/todos/INDEX.md\` — this is the dependency DAG
2. Read the implementation plan at: \`${planPath}\` for additional context
3. If \`.ui-specs/\` exists, note it for executor agents
4. If \`.omc/research/\` exists, note it for reference implementations

### TODO-Driven Execution Loop (3-Step Pipeline per TODO)

Process TODOs in dependency order. For EACH unblocked TODO, run the 3-step pipeline:

\`\`\`
REPEAT:
  1. Read .omc/todos/INDEX.md → identify all TODOs with status: pending
  2. Find UNBLOCKED TODOs: pending TODOs whose depends_on are all done
  3. If no unblocked TODOs and some still pending → report circular dependency
  4. If all TODOs are done → emit completion signal
  5. For EACH unblocked TODO, run the 3-step pipeline:

     STEP 1 — PLAN (fresh context):
       Agent(
         subagent_type="Plan",
         model="sonnet",
         prompt="Read TODO-NNN at .omc/todos/TODO-NNN.md and CLAUDE.md.
                 Create a focused implementation plan covering every aspect:
                 data, API, UI, integrations. List exact files to create/modify."
       )
       → Output: focused implementation plan for this TODO

     STEP 2 — EXECUTE:
       For simple TODOs (single scope, few files):
         Agent(
           subagent_type="aether-omcc:executor",
           model="sonnet",
           prompt="Implement TODO-NNN according to this plan: {plan from Step 1}.
                   Follow all acceptance criteria. Deliver COMPLETE, working code — not scaffolding."
         )
       For complex TODOs (multi-scope, many files):
         Create team with TeamCreate, spawn 2-3 executor agents working on different parts:
         Agent(subagent_type="aether-omcc:executor", model="sonnet", prompt="Implement {part} of TODO-NNN per plan: {plan}")
         Agent(subagent_type="aether-omcc:executor", model="sonnet", prompt="Implement {part} of TODO-NNN per plan: {plan}")

     STEP 3 — VERIFY (parallel):
       Agent(
         subagent_type="aether-omcc:code-simplifier",
         model="sonnet",
         prompt="Review and improve code quality for TODO-NNN changes.
                 Check naming, consistency, dead code, debug artifacts.
                 Ensure CLAUDE.md conventions are followed."
       )
       Agent(
         subagent_type="aether-omcc:qa-tester",
         model="sonnet",
         prompt="Read the Playwright Verification section of .omc/todos/TODO-NNN.md.
                 Test each item using Playwright MCP browser tools.
                 For web apps: browser_navigate, browser_click, browser_fill_form, browser_snapshot, browser_take_screenshot.
                 For Electron apps: use playwright-electron MCP tools.
                 Report PASS/FAIL for each verification item.
                 If FAIL: iterate — fix and retest (max 3 attempts)."
       )

  6. Update TODO frontmatter: status: done (or status: blocked after 3 failures)
  7. Update .omc/todos/INDEX.md with new statuses
  8. GOTO step 1 (next iteration picks up newly unblocked TODOs)
\`\`\`

### Agent Selection

ALWAYS use \`executor\` agent for code writing — no specialist agents:
- Simple TODOs: single \`executor\` with \`model="sonnet"\`
- Complex TODOs: team of 2-3 \`executor\` agents with \`model="sonnet"\`
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
        return `## PIPELINE STAGE: EXECUTION (Solo Mode — TODO-Driven, 3-Step Pipeline)

Execute TODOs iteratively in dependency order using a 3-step pipeline per TODO: Plan → Execute → Verify.

### Setup

1. Read the TODO index at: \`.omc/todos/INDEX.md\` — this is the dependency DAG
2. Read the implementation plan at: \`${planPath}\` for additional context
3. If \`.ui-specs/\` exists, note it for executor agents
4. If \`.omc/research/\` exists, note it for reference implementations

### TODO-Driven Execution Loop (3-Step Pipeline per TODO)

Process TODOs in dependency order. For EACH unblocked TODO, run the 3-step pipeline:

\`\`\`
REPEAT:
  1. Read .omc/todos/INDEX.md → identify all TODOs with status: pending
  2. Find UNBLOCKED TODOs: pending TODOs whose depends_on are all done
  3. If no unblocked TODOs and some still pending → report circular dependency
  4. If all TODOs are done → emit completion signal
  5. For EACH unblocked TODO, run the 3-step pipeline:

     STEP 1 — PLAN (fresh context):
       Task(
         subagent_type="Plan",
         model="sonnet",
         prompt="Read TODO-NNN at .omc/todos/TODO-NNN.md and CLAUDE.md.
                 Create a focused implementation plan covering every aspect:
                 data, API, UI, integrations. List exact files to create/modify."
       )
       → Output: focused implementation plan for this TODO

     STEP 2 — EXECUTE:
       Task(
         subagent_type="aether-omcc:executor",
         model="sonnet",
         prompt="Implement TODO-NNN according to this plan: {plan from Step 1}.
                 Follow all acceptance criteria. Deliver COMPLETE, working code — not scaffolding."
       )
       For complex TODOs: run independent TODOs as background executor agents for limited parallelism.

     STEP 3 — VERIFY (parallel):
       Task(
         subagent_type="aether-omcc:code-simplifier",
         model="sonnet",
         prompt="Review and improve code quality for TODO-NNN changes.
                 Check naming, consistency, dead code, debug artifacts.
                 Ensure CLAUDE.md conventions are followed."
       )
       Task(
         subagent_type="aether-omcc:qa-tester",
         model="sonnet",
         prompt="Read the Playwright Verification section of .omc/todos/TODO-NNN.md.
                 Test each item using Playwright MCP browser tools.
                 For web apps: browser_navigate, browser_click, browser_fill_form, browser_snapshot, browser_take_screenshot.
                 For Electron apps: use playwright-electron MCP tools.
                 Report PASS/FAIL for each verification item.
                 If FAIL: iterate — fix and retest (max 3 attempts)."
       )

  6. Update TODO frontmatter: status: done (or status: blocked after 3 failures)
  7. Update .omc/todos/INDEX.md
  8. GOTO step 1
\`\`\`

### Agent Selection

ALWAYS use \`executor\` agent for code writing — no specialist agents:
- Simple TODOs: single \`executor\` with \`model="sonnet"\`
- Complex TODOs: multiple \`executor\` agents as background tasks with \`model="sonnet"\`
- Build/test failures: \`debugger\` with \`model="sonnet"\`

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