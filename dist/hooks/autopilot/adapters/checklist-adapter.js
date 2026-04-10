export const CHECKLIST_COMPLETION_SIGNAL = 'PIPELINE_CHECKLIST_COMPLETE';
export const checklistAdapter = {
    id: 'checklist',
    name: 'Test Checklist Generation',
    completionSignal: CHECKLIST_COMPLETION_SIGNAL,
    shouldSkip(_config) {
        return false;
    },
    getPrompt(context) {
        return `## Stage: Test Checklist Generation

### Objective
Generate an exhaustive project-wide test checklist covering every UI interaction, form, button, page, and component.

### Instructions
1. Read the plan at: ${context.planPath || '.omc/plans/'}
2. Read UI specs at: .ui-specs/ (if exists)
3. Read the spec at: ${context.specPath || '.omc/specs/'}
4. Invoke /aether-omcc:checklist to generate the exhaustive checklist
5. Output: .omc/checklists/project-checklist.md

### Quality Gate
The checklist must cover:
- Every page/route in the app
- Every form with valid AND invalid submissions
- Every button and its expected behavior
- Every interactive component (modals, dropdowns, toggles, etc.)
- Every loading, empty, and error state
- Responsive behavior at mobile/tablet/desktop
- Data flow: creating items shows in lists, deleting removes from all views

### Completion
When the checklist is complete: ${CHECKLIST_COMPLETION_SIGNAL}
`;
    },
};
//# sourceMappingURL=checklist-adapter.js.map