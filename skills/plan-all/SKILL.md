---
name: plan-all
description: Full planning pipeline — interview + plan + research + UI specs + exhaustive TODOs with user gates
level: 4
---

# Plan-All: Complete Planning Pipeline

## Purpose

Run the full planning pipeline in sequence: deep interview → consensus planning → deep research → UI specifications → exhaustive TODO generation. Each stage builds on the previous, and user approval gates ensure alignment at critical transitions.

## Pipeline Stages

### Stage 1: Deep Interview (Spec Generation)

**Skip if:** `.omc/specs/deep-interview-*.md` already exists

1. Invoke `/aether-omcc:deep-interview` skill
2. Conduct Socratic interview with mathematical ambiguity gating (threshold ≤ 20%)
3. Output: `.omc/specs/deep-interview-{slug}.md`
4. The interview skill has its own built-in quality gates — do not skip or rush it

### Stage 2: Consensus Planning (Ralplan)

**Skip if:** `.omc/plans/consensus-*.md` or `.omc/plans/ralplan-*.md` already exists

1. Invoke `/aether-omcc:ralplan` with `--consensus --direct` flags
2. Three-stage consensus: Planner → Architect → Critic
3. Output: `.omc/plans/consensus-{slug}.md`
4. The ralplan skill has its own review loop — let it complete

### Stage 3: Deep Research (Smart Detection)

**Skip if:** `.omc/research/summary.md` already exists OR plan is simple (< 3 tasks, single technology)

1. Read the consensus plan
2. Apply smart detection heuristics:
   - **SKIP** if: plan has < 3 tasks AND uses single well-known technology AND no complex integrations
   - **RUN** if: 3+ technologies, complex integrations, security-critical, 5+ tasks
3. If running: invoke `/aether-omcc:deep-research` skill
4. Output: `.omc/research/summary.md` + per-topic research files

### Stage 4: UI Specifications

**Skip if:** `.ui-specs/index.html` already exists OR plan has no UI/frontend components

1. Invoke `/aether-omcc:ui-specs` skill
2. Design token setup (user confirms colors, fonts, spacing)
3. Per-page HTML spec generation
4. Gallery generation and serving
5. **USER GATE**: Use AskUserQuestion to get approval:
   - "Approve all UI specs" → proceed to Stage 5
   - "Edit design tokens" → re-run token setup
   - "Redesign [page]" → regenerate specific page
   - "Add new page" → extend page inventory
6. Output: `.ui-specs/` directory with tokens, pages, gallery

### Stage 5: Exhaustive TODO Generation

1. Invoke `/aether-omcc:todos` skill
2. Read ALL planning artifacts (spec, plan, research, UI specs)
3. Generate exhaustive `.omc/todos/TODO-NNN.md` files covering every aspect
4. Generate `.omc/todos/INDEX.md` with dependency DAG
5. For each TODO: spawn researcher agents to find reference implementations
6. **USER GATE**: Use AskUserQuestion to get approval:
   - "Approve TODOs" → complete planning pipeline
   - "Add more detail to TODO-NNN" → expand specific TODO
   - "Split TODO-NNN" → decompose large TODO
   - "Add missing TODO for [feature]" → generate additional TODO
7. Output: `.omc/todos/` directory

## Completion

Present a summary of all planning artifacts:

```
## Planning Complete

### Artifacts Generated
- **Spec**: .omc/specs/deep-interview-{slug}.md
- **Plan**: .omc/plans/consensus-{slug}.md
- **Research**: .omc/research/summary.md (X topics researched)
- **UI Specs**: .ui-specs/ (Y pages, Z design tokens)
- **TODOs**: .omc/todos/ (N tasks, M must-have, K should-have)

### Dependency Overview
{ASCII DAG from INDEX.md}

### Ready for Build
Run `/aether-omcc:build-all` or `/aether-omcc:autopilot` to start implementation.
```

## Error Handling

- If any stage fails, report the error and ask user whether to retry or skip
- If a spec/plan already exists but is outdated, ask user whether to regenerate or reuse
- If deep research times out, proceed with existing knowledge and note the gap

## Flags

- `--skip-research` — Skip deep research stage entirely
- `--skip-ui` — Skip UI specs stage (for backend-only projects)
- `--force` — Regenerate all artifacts even if they exist
