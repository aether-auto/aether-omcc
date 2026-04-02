/**
 * Pipeline Stage Adapters
 *
 * Barrel export for all stage adapters. Each adapter wraps an existing module
 * (ralplan, team, ralph, ultraqa) into the PipelineStageAdapter interface.
 */
export { ralplanAdapter, RALPLAN_COMPLETION_SIGNAL } from './ralplan-adapter.js';
export { uiSpecsAdapter, UI_SPECS_COMPLETION_SIGNAL } from './ui-specs-adapter.js';
export { researchAdapter, RESEARCH_COMPLETION_SIGNAL } from './research-adapter.js';
export { todosAdapter, TODOS_COMPLETION_SIGNAL } from './todos-adapter.js';
export { executionAdapter, EXECUTION_COMPLETION_SIGNAL } from './execution-adapter.js';
export { ralphAdapter, RALPH_COMPLETION_SIGNAL } from './ralph-adapter.js';
export { qaAdapter, QA_COMPLETION_SIGNAL } from './qa-adapter.js';
import { ralplanAdapter } from './ralplan-adapter.js';
import { uiSpecsAdapter } from './ui-specs-adapter.js';
import { researchAdapter } from './research-adapter.js';
import { todosAdapter } from './todos-adapter.js';
import { executionAdapter } from './execution-adapter.js';
import { ralphAdapter } from './ralph-adapter.js';
import { qaAdapter } from './qa-adapter.js';
/**
 * All stage adapters in canonical execution order.
 * The pipeline orchestrator iterates through these in sequence,
 * skipping any that are disabled by configuration.
 */
export const ALL_ADAPTERS = [
    ralplanAdapter,
    researchAdapter,
    uiSpecsAdapter,
    todosAdapter,
    executionAdapter,
    ralphAdapter,
    qaAdapter,
];
/**
 * Look up an adapter by stage ID.
 */
export function getAdapterById(id) {
    return ALL_ADAPTERS.find(a => a.id === id);
}
//# sourceMappingURL=index.js.map