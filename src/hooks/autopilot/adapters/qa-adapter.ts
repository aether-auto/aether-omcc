/**
 * QA Stage Adapter
 *
 * Wraps the existing UltraQA module into the pipeline stage adapter interface.
 *
 * The QA stage runs build/lint/test cycling until all checks pass
 * or the maximum number of cycles is reached.
 */

import type { PipelineStageAdapter, PipelineConfig, PipelineContext } from '../pipeline-types.js';
import { getQAPrompt } from '../prompts.js';

export const QA_COMPLETION_SIGNAL = 'PIPELINE_QA_COMPLETE';

export const qaAdapter: PipelineStageAdapter = {
  id: 'qa',
  name: 'Quality Assurance',
  completionSignal: QA_COMPLETION_SIGNAL,

  shouldSkip(config: PipelineConfig): boolean {
    return !config.qa;
  },

  getPrompt(_context: PipelineContext): string {
    return `## PIPELINE STAGE: QA (Quality Assurance)

Run build/lint/test cycling until all checks pass.

${getQAPrompt()}

### Playwright Browser Testing (MANDATORY for UI tasks)

For any task that modified frontend code, components, pages, or styles:

1. **Start the dev server** if not already running
2. **browser_navigate** to each affected page/route
3. **browser_snapshot** to verify element presence and accessibility tree
4. **browser_click** / **browser_fill_form** to test key interactions
5. **browser_take_screenshot** for visual evidence of each tested screen
6. **browser_console_messages** to verify 0 JavaScript errors
7. **browser_resize** to test responsive layout at mobile (375px), tablet (768px), and desktop (1280px)

Evidence requirements:
- Every UI-related test case must include a screenshot
- Console must show 0 error-level messages
- Accessibility snapshot must confirm expected elements are present

For Electron apps: use playwright-electron MCP tools if available, otherwise test via HTTP interface.

### Completion

When all QA checks pass (including Playwright browser tests for UI tasks):

Signal: ${QA_COMPLETION_SIGNAL}
`;
  },
};
