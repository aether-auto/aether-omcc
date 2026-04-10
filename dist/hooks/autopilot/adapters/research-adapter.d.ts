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
import type { PipelineStageAdapter } from "../pipeline-types.js";
export declare const RESEARCH_COMPLETION_SIGNAL = "PIPELINE_RESEARCH_COMPLETE";
export declare const researchAdapter: PipelineStageAdapter;
//# sourceMappingURL=research-adapter.d.ts.map