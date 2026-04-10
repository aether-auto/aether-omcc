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
import type { PipelineStageAdapter } from "../pipeline-types.js";
export declare const UI_SPECS_COMPLETION_SIGNAL = "PIPELINE_UI_SPECS_COMPLETE";
export declare const uiSpecsAdapter: PipelineStageAdapter;
//# sourceMappingURL=ui-specs-adapter.d.ts.map