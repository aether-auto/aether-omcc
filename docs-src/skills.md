# Skills Reference

Skills are slash-command workflows that orchestrate agents, tools, and pipelines. Invoke any skill with `/aether-omcc:<skill-name>`.

---

## Pipeline Skills

These skills form the core 2-phase pipeline.

### build-all

Full end-to-end pipeline from idea to working code.

```
/aether-omcc:build-all "Build a task management app with drag-and-drop"
```

Runs Phase 1 (planning) then Phase 2 (building) with a confirmation gate between them. This is the primary entry point for new projects.

**Pipeline:** `deep-interview` -> `ralplan` -> `deep-research` -> `ui-specs` -> `checklist` -> `todos` -> `autopilot`

---

### plan-all

Phase 1 only -- full planning pipeline without building.

```
/aether-omcc:plan-all "Design a real-time dashboard"
```

Produces all planning artifacts (spec, plan, research, UI specs, checklist, TODOs) and stops at the confirmation gate. Use this when you want to review and iterate on the plan before committing to execution.

---

### init-project

Iterative workflow kickoff — scaffold a project foundation.

```
/aether-omcc:init-project "Build a recipe sharing platform"
```

Alternative to `build-all` for users who prefer to work feature-by-feature. Runs a brief 3-5 question interview (not a full deep interview), researches the tech stack, generates scaffold TODOs (project setup, base layout, auth, DB), and builds the foundation. Then use `/next-feature` to add features one at a time.

**Pipeline:** `brief interview` -> `research` -> `scaffold TODOs` -> `build` -> `feature tracker`

---

### next-feature

Build one feature at a time in an existing project.

```
/aether-omcc:next-feature "user dashboard with task list and analytics"
```

Per-feature iteration command used after `/init-project`. Each invocation runs a short 2-4 question planning interview, adds to the project checklist, optionally generates UI specs, creates feature TODOs, builds them with the per-TODO pipeline, verifies against the feature's checklist items, and runs a short QA pass.

**Pipeline:** `short plan` -> `checklist additions` -> `UI specs (optional)` -> `feature TODOs` -> `build` -> `verify checklist` -> `QA`

---

### autopilot

Full autonomous execution from idea to working code.

```
/aether-omcc:autopilot "Implement the user authentication flow"
```

Takes a task description and handles the full lifecycle: requirements analysis, technical design, planning, parallel implementation, QA cycling, and multi-perspective validation. Best used when you have a clear task or when Phase 1 has already been completed.

---

### plan

Strategic planning with optional interview workflow.

```
/aether-omcc:plan "Refactor the database layer"
```

Creates a focused plan for a specific task. Lighter-weight than `plan-all` -- does not include research, UI specs, or checklist stages.

---

## Interview and Research Skills

### deep-interview

Socratic deep interview with mathematical ambiguity gating.

```
/aether-omcc:deep-interview "I want to build a marketplace"
```

Conducts multi-round Q&A to eliminate all ambiguity from a request. Uses a mathematical scoring system -- the interview continues until ambiguity reaches 0%. Produces a crystal-clear specification document.

**Key settings:**

- Ambiguity threshold: 0%
- Multi-question rounds (3-5 questions per round)
- Structured output with no assumptions

---

### deep-research

Multi-agent deep research using orchestrator-worker pattern.

```
/aether-omcc:deep-research "Best practices for WebSocket scaling"
```

Deploys 5-10 parallel researcher agents to investigate a topic. The orchestrator synthesizes findings into actionable research artifacts. Smart detection determines what actually needs investigation.

---

### deep-dive

2-stage pipeline combining trace and deep-interview.

```
/aether-omcc:deep-dive "Why is the API intermittently slow?"
```

Stage 1 uses causal tracing to investigate the problem, then Stage 2 uses deep-interview to crystallize requirements for a fix. Includes 3-point injection for context passing between stages.

---

### external-context

Invoke parallel document-specialist agents for external lookups.

```
/aether-omcc:external-context "React Server Components streaming API"
```

Sends parallel document-specialist agents to search external web documentation and bring findings back into context.

---

## Planning Skills

### ralplan

Consensus planning entrypoint with auto-gating.

```
/aether-omcc:ralplan "Build a CI/CD pipeline"
```

Orchestrates Planner, Architect, and Critic agents in a review loop until all three converge on a plan. Auto-gates vague requests by redirecting them through the interview first.

---

### todos

Generate exhaustive TODO checklists from planning artifacts.

```
/aether-omcc:todos
```

Produces 8-15 feature-sized implementation tasks with acceptance criteria and Playwright verification steps. Designed to be consumed by the autopilot execution phase.

---

### checklist

Generate exhaustive project-wide test checklist.

```
/aether-omcc:checklist
```

Creates a test inventory covering every UI interaction, form, button, and component. Used as the verification source during QA cycling.

---

### ui-specs

Generate visual UI specifications with design tokens.

```
/aether-omcc:ui-specs
```

Produces design tokens (colors, spacing, typography), per-page HTML specs, and an interactive gallery served on port 8420 for visual review.

---

## Execution Skills

### ralph

Self-referential persistence loop until task completion.

```
/aether-omcc:ralph "Complete all remaining TODOs"
```

Keeps running until the task is verified complete. Configurable verification reviewer. Ideal for long-running tasks that need guaranteed completion.

**Trigger keyword:** `ralph`

---

### ultrawork

Parallel execution engine for high-throughput task completion.

```
/aether-omcc:ultrawork "Run these 5 refactoring tasks"
```

Runs multiple tasks in parallel for maximum throughput. Best for independent tasks that don't share state.

**Trigger keyword:** `ulw`

---

### team

N coordinated agents on a shared task list.

```
/aether-omcc:team "Build and test the API endpoints"
```

Creates a team of coordinated agents working on a shared task list using Claude Code native teams.

---

### omc-teams

CLI-team runtime for process-based parallel execution.

```
/aether-omcc:omc-teams
```

Spawns claude, codex, or gemini workers in tmux panes for process-based parallel execution.

---

### ccg

Claude-Codex-Gemini tri-model orchestration.

```
/aether-omcc:ccg "Review this architecture decision"
```

Routes a prompt through Codex and Gemini, then Claude synthesizes results from all three models.

**Trigger keyword:** `ccg`

---

## QA and Verification Skills

### ultraqa

QA cycling workflow -- test, verify, fix, repeat.

```
/aether-omcc:ultraqa
```

Runs a build/lint/test cycle and fixes issues until all checks pass. Used during Phase 2 verification.

---

### playwright-qa

Playwright-based browser QA testing.

```
/aether-omcc:playwright-qa
```

Runs Playwright browser tests against the project's test checklist.

---

### visual-verdict

Structured visual QA verdict for screenshot comparisons.

```
/aether-omcc:visual-verdict
```

Compares screenshots to reference designs and produces a structured pass/fail verdict.

---

### trace

Evidence-driven tracing lane.

```
/aether-omcc:trace "Find the root cause of the memory leak"
```

Orchestrates competing tracer hypotheses with evidence for/against scoring. Uses Claude built-in team mode for parallel hypothesis investigation.

**Trigger keyword:** `trace`

---

## Bug Fixing

### fix-bug

Structured bug fix pipeline.

```
/aether-omcc:fix-bug "Login form submits twice on slow connections"
```

Follows a strict workflow: reproduce -> diagnose -> plan fix -> execute -> verify with Playwright and tests.

---

## Code Quality Skills

### ai-slop-cleaner

Clean AI-generated code slop.

```
/aether-omcc:ai-slop-cleaner
```

Regression-safe, deletion-first cleanup workflow. Targets bloated, repetitive, weakly tested, or over-abstracted code. Supports `--review` flag for reviewer-only mode.

**Trigger keywords:** `deslop`, `anti-slop`, `AI slop`

---

### sciomc

Orchestrate parallel scientist agents for analysis.

```
/aether-omcc:sciomc "Analyze performance bottlenecks"
```

Deploys parallel scientist agents for comprehensive data analysis with AUTO mode.

---

## Utility Skills

### table

Table an idea for later.

```
/aether-omcc:table "Add email notifications for overdue tasks"
```

Stores enriched ideas in the background without stopping current work. Ideas are persisted and can be retrieved later.

---

### ask

Route prompts to Claude, Codex, or Gemini.

```
/aether-omcc:ask codex "Review this patch for security issues"
/aether-omcc:ask gemini "Suggest UX improvements for this flow"
```

Process-first advisor routing with artifact capture.

---

### learner

Extract a reusable skill from the current conversation.

```
/aether-omcc:learner
```

Analyzes the current conversation and extracts patterns into a reusable skill definition.

---

### skill

Manage local skills.

```
/aether-omcc:skill list
/aether-omcc:skill add
/aether-omcc:skill remove <name>
```

List, add, remove, search, and edit skills. Includes a setup wizard for new skill creation.

---

### cancel

Cancel any active execution mode.

```
/aether-omcc:cancel
```

Stops autopilot, ralph, ultrawork, ultraqa, swarm, ultrapilot, pipeline, or team execution.

**Trigger keyword:** `cancelomc`

---

### hud

Configure HUD display options.

```
/aether-omcc:hud
```

Adjust layout, presets, and display elements for the heads-up display.

---

### writer-memory

Agentic memory system for writers.

```
/aether-omcc:writer-memory
```

Track characters, relationships, scenes, and themes for creative writing projects.

---

## Setup and Diagnostics Skills

### setup

Install/update routing entrypoint.

```
/aether-omcc:setup
```

Routes to the correct setup flow (omc-setup, omc-doctor, or mcp-setup) based on your request.

---

### omc-setup

Install or refresh oh-my-claudecode.

```
/aether-omcc:omc-setup
```

Canonical setup flow for plugin, npm, and local-dev installations.

---

### omc-doctor

Diagnose and fix installation issues.

```
/aether-omcc:omc-doctor
```

Checks configuration, dependencies, and state integrity. Suggests and applies fixes.

---

### mcp-setup

Configure MCP servers.

```
/aether-omcc:mcp-setup
```

Guided setup for popular MCP servers (Playwright, Figma, etc.).

---

### configure-notifications

Configure notification integrations.

```
/aether-omcc:configure-notifications
```

Set up Telegram, Discord, or Slack notifications via natural language configuration.

---

### deepinit

Deep codebase initialization.

```
/aether-omcc:deepinit
```

Analyzes the codebase and generates hierarchical AGENTS.md documentation describing the project structure.

---

### omc-reference

OMC reference documentation (auto-loaded).

```
/aether-omcc:omc-reference
```

Agent catalog, tools, team pipeline routing, commit protocol, and skills registry. Auto-loads when delegating to agents or using OMC tools.

---

### project-session-manager

Worktree-first dev environment manager.

```
/aether-omcc:project-session-manager
```

Manages git worktrees for issues, PRs, and features with optional tmux sessions.

---

### release

Automated release workflow.

```
/aether-omcc:release
```

Handles versioning, changelog generation, and release publication for the plugin.

---

## Complete Skills Table

| Skill | Command | Category |
|-------|---------|----------|
| `build-all` | `/aether-omcc:build-all` | Pipeline |
| `plan-all` | `/aether-omcc:plan-all` | Pipeline |
| `init-project` | `/aether-omcc:init-project` | Pipeline |
| `next-feature` | `/aether-omcc:next-feature` | Pipeline |
| `autopilot` | `/aether-omcc:autopilot` | Pipeline |
| `plan` | `/aether-omcc:plan` | Planning |
| `deep-interview` | `/aether-omcc:deep-interview` | Interview |
| `deep-research` | `/aether-omcc:deep-research` | Research |
| `deep-dive` | `/aether-omcc:deep-dive` | Research |
| `external-context` | `/aether-omcc:external-context` | Research |
| `ralplan` | `/aether-omcc:ralplan` | Planning |
| `todos` | `/aether-omcc:todos` | Planning |
| `checklist` | `/aether-omcc:checklist` | Planning |
| `ui-specs` | `/aether-omcc:ui-specs` | Planning |
| `ralph` | `/aether-omcc:ralph` | Execution |
| `ultrawork` | `/aether-omcc:ultrawork` | Execution |
| `team` | `/aether-omcc:team` | Execution |
| `omc-teams` | `/aether-omcc:omc-teams` | Execution |
| `ccg` | `/aether-omcc:ccg` | Execution |
| `ultraqa` | `/aether-omcc:ultraqa` | QA |
| `playwright-qa` | `/aether-omcc:playwright-qa` | QA |
| `visual-verdict` | `/aether-omcc:visual-verdict` | QA |
| `trace` | `/aether-omcc:trace` | Debugging |
| `fix-bug` | `/aether-omcc:fix-bug` | Debugging |
| `ai-slop-cleaner` | `/aether-omcc:ai-slop-cleaner` | Code Quality |
| `sciomc` | `/aether-omcc:sciomc` | Analysis |
| `table` | `/aether-omcc:table` | Utility |
| `ask` | `/aether-omcc:ask` | Utility |
| `learner` | `/aether-omcc:learner` | Utility |
| `skill` | `/aether-omcc:skill` | Utility |
| `cancel` | `/aether-omcc:cancel` | Utility |
| `hud` | `/aether-omcc:hud` | Utility |
| `writer-memory` | `/aether-omcc:writer-memory` | Utility |
| `setup` | `/aether-omcc:setup` | Setup |
| `omc-setup` | `/aether-omcc:omc-setup` | Setup |
| `omc-doctor` | `/aether-omcc:omc-doctor` | Setup |
| `mcp-setup` | `/aether-omcc:mcp-setup` | Setup |
| `configure-notifications` | `/aether-omcc:configure-notifications` | Setup |
| `deepinit` | `/aether-omcc:deepinit` | Setup |
| `omc-reference` | `/aether-omcc:omc-reference` | Reference |
| `project-session-manager` | `/aether-omcc:project-session-manager` | Utility |
| `release` | `/aether-omcc:release` | Utility |
