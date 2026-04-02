---
name: todos
description: Generate exhaustive TODO checklists with acceptance criteria from planning artifacts
level: 3
---

# TODO Generation (Exhaustive Checklists)

Generate formal, trackable TODO items with detailed acceptance criteria from planning artifacts. Every aspect of the project MUST be covered -- nothing is left implicit.

## Usage

```
/aether-omcc:todos
```

## Inputs

The skill reads planning artifacts in this priority order:

1. **Consensus plan** (required): `.omc/plans/ralplan-*.md` or `.omc/plans/consensus-*.md`
2. **Deep interview spec** (optional): `.omc/specs/deep-interview-*.md`
3. **Research artifacts** (optional): `.omc/research/` directory

If no plan is found, stop and instruct the user to run `/aether-omcc:ralplan` first.

## Outputs

- `.omc/todos/TODO-NNN.md` -- one file per task, following the format in `references/todo-format.md`
- `.omc/todos/INDEX.md` -- master index with summary tables and a dependency DAG

## Workflow

### Step 1: Read Planning Artifacts

1. Read the consensus plan from `.omc/plans/ralplan-*.md` or `.omc/plans/consensus-*.md`.
2. If `.omc/specs/deep-interview-*.md` exists, read it for additional context on requirements and constraints.
3. If `.omc/research/` contains files, read them for reference implementations and technical details.

### Step 2: Identify All Deliverables

Extract EVERY deliverable from the plan:
- Every data model and its fields/relationships
- Every API endpoint with methods, status codes, request/response shapes
- Every UI screen/page and its components/interactions
- Every integration point (third-party APIs, webhooks, events)
- Every auth flow (registration, login, logout, password reset, role checks)
- Every background job or scheduled task
- Every configuration or environment variable needed
- Every error handling requirement
- Every testing requirement (unit, integration, e2e)

### Step 3: Decompose into Vertical Slices

Follow the decomposition rules in `references/decomposition-guide.md`:

- **Vertical slices**: Each TODO delivers end-to-end value (data + API + UI), not a horizontal layer.
- **INVEST quality**: Independent, Negotiable, Valuable, Estimable, Sized, Testable.
- **8/80 guideline**: Each task should take 1-4 hours of focused agent work.
- **Foundation first**: Auth, base models, shared layouts, and config are the earliest TODOs.
- **Domain-specific criteria**: Apply the checklist patterns from `references/checklist-patterns.md` based on task type.

### Step 4: Write TODO Files

For each task, create `.omc/todos/TODO-NNN.md` using the template in `references/todo-format.md`.

Numbering rules:
- `TODO-001` through `TODO-NNN`, zero-padded to 3 digits.
- Foundation tasks get the lowest numbers.
- Number in dependency order: if TODO-005 depends on TODO-002, TODO-002 MUST have a lower number.

Each TODO MUST have:
- A clear, imperative title (e.g., "Implement user registration endpoint")
- A one-sentence summary explaining what it delivers and why
- A description covering Data, API, and UI aspects (mark N/A if not applicable)
- **At least 3 specific, testable acceptance criteria** as checkboxes
  - Criteria MUST contain concrete values (endpoint paths, status codes, field names, screen names)
  - Criteria MUST be independently verifiable
- A dependencies section listing prerequisite TODOs with reasons
- Priority: must-have (core MVP), should-have (secondary MVP), could-have (future/nice-to-have)
- Scope tags: `[frontend, backend, database, config]` as applicable

### Step 5: Generate INDEX.md

Create `.omc/todos/INDEX.md` containing:

1. **Summary**: Total TODO count, breakdown by priority and status.
2. **Table of all TODOs**: Columns: ID, Title, Priority, Status, Scope, Dependencies.
3. **Dependency DAG**: A text-based directed acyclic graph showing execution order. Use ASCII or Mermaid syntax. Group by execution tier (foundation -> core features -> secondary features -> polish).
4. **Critical path**: Identify the longest dependency chain and note it.

### Step 6: Exhaustiveness Verification

**This step is mandatory.** Before completing, verify ALL of the following:

- [ ] Every API endpoint in the plan has a corresponding TODO
- [ ] Every data model in the plan has a corresponding TODO
- [ ] Every UI screen/page in the plan has a corresponding TODO
- [ ] Every integration point in the plan has a corresponding TODO
- [ ] Auth and authorization are fully covered (registration, login, logout, role checks, token management)
- [ ] Error handling is covered (validation errors, server errors, network errors, edge cases)
- [ ] Database migrations and seed data are covered
- [ ] Configuration and environment setup is covered
- [ ] Testing is covered (unit tests, integration tests, e2e tests as specified in plan)
- [ ] No TODO has fewer than 3 acceptance criteria
- [ ] All acceptance criteria contain concrete, testable values
- [ ] Dependencies form a valid DAG (no circular dependencies)
- [ ] Foundation tasks have no dependencies or only depend on other foundation tasks
- [ ] Priority assignments follow the mapping: core MVP -> must-have, secondary MVP -> should-have, future -> could-have

If any check fails, add the missing TODOs or fix the issues before proceeding.

## Completion

When all TODO files and INDEX.md are generated and the exhaustiveness verification passes, output:

```
PIPELINE_TODOS_COMPLETE
```

## References

- `references/todo-format.md` -- Template for individual TODO files
- `references/decomposition-guide.md` -- Rules for task decomposition
- `references/checklist-patterns.md` -- Acceptance criteria templates by task type
