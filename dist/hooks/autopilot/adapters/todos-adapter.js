/**
 * TODO Generation Stage Adapter
 *
 * Generates exhaustive, trackable TODO items with detailed acceptance criteria
 * from planning artifacts. Sits between RALPLAN (planning) and EXECUTION stages
 * to ensure every aspect of the plan is decomposed into actionable tasks.
 */
export const TODOS_COMPLETION_SIGNAL = "PIPELINE_TODOS_COMPLETE";
export const todosAdapter = {
    id: "todos",
    name: "TODO Generation",
    completionSignal: TODOS_COMPLETION_SIGNAL,
    shouldSkip(_config) {
        // Never skip — todos are always generated if we have a plan
        return false;
    },
    getPrompt(context) {
        return `## Stage: TODO Generation

### Objective
Generate exhaustive, trackable TODO items with detailed acceptance criteria from the planning artifacts.

### Instructions
1. Read the plan at: ${context.planPath || ".omc/plans/"}
2. Read any deep-interview spec at: ${context.specPath || ".omc/specs/"}
3. Read any research at: .omc/research/ (if exists)
4. Invoke the /aether-omcc:todos skill to generate comprehensive TODOs
5. Verify TODOs cover EVERY aspect of the project:
   - Every data model mentioned in the plan
   - Every API endpoint specified
   - Every UI screen/page described
   - Every integration point
   - Auth, error handling, testing
6. Each TODO must have >=3 specific, testable acceptance criteria
7. Generate .omc/todos/INDEX.md with dependency DAG

### Completion
When all TODOs are generated and INDEX.md is complete, emit: ${TODOS_COMPLETION_SIGNAL}

### Quality Gate
Before completing, verify:
- No TODO has fewer than 3 acceptance criteria
- All acceptance criteria are specific (contain concrete values, endpoints, or screen names)
- Dependencies form a valid DAG (no circular dependencies)
- Foundation tasks (auth, base models, layouts) have no dependencies or only depend on other foundation tasks
`;
    },
};
//# sourceMappingURL=todos-adapter.js.map