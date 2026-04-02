/**
 * UI Specs Stage Adapter
 *
 * Pipeline stage that generates visual UI specifications with shared design
 * tokens and an interactive gallery for user review. This stage runs after
 * planning (ralplan) and before execution.
 *
 * The stage invokes the /aether-omcc:ui-specs skill which handles:
 * - Extracting screen inventory from the plan
 * - Setting up design tokens (with user input)
 * - Generating self-contained HTML specs per page
 * - Creating an interactive gallery with live token editing
 * - Serving for user review with an approval gate
 */

import type {
  PipelineStageAdapter,
  PipelineConfig,
  PipelineContext,
} from "../pipeline-types.js";

export const UI_SPECS_COMPLETION_SIGNAL = "PIPELINE_UI_SPECS_COMPLETE";

export const uiSpecsAdapter: PipelineStageAdapter = {
  id: "ui-specs",
  name: "UI Specifications",
  completionSignal: UI_SPECS_COMPLETION_SIGNAL,

  shouldSkip(config: PipelineConfig): boolean {
    // Skip if no UI/frontend content detected — the orchestrator checks the plan
    // For now, default to not skipping (orchestrator handles detection)
    return false;
  },

  getPrompt(context: PipelineContext): string {
    return `## Stage: UI Specifications

### Objective
Generate visual UI specifications with shared design tokens for all screens in the project.

### Instructions
1. Read the plan at: ${context.planPath || ".omc/plans/"}
2. Read the spec at: ${context.specPath || ".omc/specs/"}
3. Invoke the /aether-omcc:ui-specs skill
4. The skill will:
   a. Extract screen inventory from the plan
   b. Set up design tokens (ask user for preferences)
   c. Generate self-contained HTML spec for each page
   d. Create an interactive gallery
   e. Serve for user review
5. IMPORTANT: Use AskUserQuestion to confirm user approves the specs before proceeding

### User Gate
This stage REQUIRES user approval before proceeding. Do not auto-advance.
Use AskUserQuestion with these options:
- "Approve all specs" → emit completion signal
- "Edit design tokens" → re-run token setup
- "Redesign page: [name]" → regenerate specific page
- "Add new page" → add to spec inventory

### Completion
When user approves, emit: PIPELINE_UI_SPECS_COMPLETE
`;
  },
};
