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
            return `## PIPELINE STAGE: EXECUTION (Team Mode)

Execute the implementation plan using multi-worker team execution.

### Setup

Read the implementation plan at: \`${planPath}\`

### Team Execution

Use the Team orchestrator to execute tasks in parallel:

1. **Create team** with TeamCreate
2. **Create tasks** from the implementation plan using TaskCreate
3. **Spawn executor teammates** using Task with \`team_name\` parameter
4. **Monitor progress** as teammates complete tasks
5. **Coordinate** dependencies between tasks

### Agent Selection

Match agent types to task scope and complexity:

**Specialist Agents (prefer for full-stack features):**
- UI, pages, components, styles, client state: \`frontend-dev\` with \`model="sonnet"\`
- API routes, services, middleware, business logic: \`backend-dev\` with \`model="sonnet"\`
- Schema, migrations, seeds, queries: \`db-dev\` with \`model="sonnet"\`

**General Agents:**
- Simple tasks (single file, config): \`executor\` with \`model="haiku"\`
- Standard implementation (non-scoped): \`executor\` with \`model="sonnet"\`
- Complex work (architecture, refactoring): \`executor\` with \`model="opus"\`
- Build issues: \`debugger\` with \`model="sonnet"\`
- Test creation: \`test-engineer\` with \`model="sonnet"\`
- UI work (design-focused): \`designer\` with \`model="sonnet"\`

### Team Dispatch for Full-Stack Tasks

When a task spans multiple layers (Data + API + UI), spawn specialist agents IN PARALLEL:
1. Analyze the task scope sections (Data/API/UI)
2. Spawn \`db-dev\` for Data scope, \`backend-dev\` for API scope, \`frontend-dev\` for UI scope
3. Each agent receives the relevant TODO details via SendMessage
4. Each agent implements their scope independently and reports back
5. After all agents complete, run integration tests
6. If tests fail, spawn \`debugger\` to diagnose cross-layer issues

### Progress Tracking

Track progress through the task list:
- Mark tasks \`in_progress\` when starting
- Mark tasks \`completed\` when verified
- Add discovered tasks as they emerge

### Completion

When ALL tasks from the plan are implemented:

Signal: ${EXECUTION_COMPLETION_SIGNAL}
`;
        }
        // Solo execution mode
        return `## PIPELINE STAGE: EXECUTION (Solo Mode)

Execute the implementation plan using single-session execution.

### Setup

Read the implementation plan at: \`${planPath}\`

### Solo Execution

Execute tasks sequentially (or with limited parallelism via background agents):

1. Read and understand each task from the plan
2. Execute tasks in dependency order
3. Use executor agents for independent tasks that can run in parallel
4. Track progress in the TODO list

### Agent Spawning

\`\`\`
// For simple tasks (single file, straightforward logic)
Task(subagent_type="oh-my-claudecode:executor", model="haiku", prompt="...")

// For standard implementation (feature, multiple methods)
Task(subagent_type="oh-my-claudecode:executor", model="sonnet", prompt="...")

// For complex work (architecture, debugging, refactoring)
Task(subagent_type="oh-my-claudecode:executor", model="opus", prompt="...")
\`\`\`

### Progress Tracking

Update TODO list as tasks complete:
- Mark task \`in_progress\` when starting
- Mark task \`completed\` when done
- Add new tasks if discovered during implementation

### Completion

When ALL tasks from the plan are implemented:

Signal: ${EXECUTION_COMPLETION_SIGNAL}
`;
    },
};
//# sourceMappingURL=execution-adapter.js.map