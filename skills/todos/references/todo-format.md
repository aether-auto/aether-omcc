# TODO File Format

Every TODO file MUST follow this exact structure. Save as `.omc/todos/TODO-NNN.md`.

## Template

```markdown
---
id: TODO-NNN
title: "Short imperative title"
status: pending
priority: must-have | should-have | could-have
depends_on: []
scope: [frontend, backend, database, config]
---
# TODO-NNN: {Title}

## Summary
One sentence: what this delivers and why.

## Description
- **Data:** Models, migrations, relationships needed
- **API:** Endpoints with methods, status codes, request/response shapes
- **UI:** Pages, components, interactions, responsive behavior

## Acceptance Criteria
- [ ] Specific, testable criterion with concrete values
- [ ] Another testable criterion
- [ ] At least 3 criteria per TODO

## Dependencies
- TODO-XXX: reason for dependency

## Reference Implementations
(Populated by research agents -- see reference-research-guide.md)
```

## Field Rules

### id
- Format: `TODO-NNN` where NNN is zero-padded to 3 digits.
- Example: `TODO-001`, `TODO-042`, `TODO-123`.

### title
- Short, imperative verb phrase.
- Good: "Implement user registration endpoint"
- Bad: "User registration" (not imperative), "The user registration endpoint should be implemented" (too long)

### status
- Always `pending` when first generated.
- Other values used during execution: `in-progress`, `complete`, `blocked`.

### priority
- `must-have`: Core MVP features -- the project does not work without these.
- `should-have`: Secondary MVP features -- important but the project is functional without them.
- `could-have`: Nice-to-have features -- future enhancements, optimizations, polish.

### depends_on
- Array of TODO IDs that must be completed before this one can start.
- Example: `[TODO-001, TODO-003]`
- Foundation tasks should have empty arrays or only depend on other foundation tasks.
- MUST NOT create circular dependencies.

### scope
- Array of affected layers: `frontend`, `backend`, `database`, `config`.
- Most vertical-slice TODOs will have multiple scope tags.

### Acceptance Criteria Rules
- Minimum 3 criteria per TODO.
- Each criterion MUST be specific and testable:
  - Good: "POST /api/users returns 201 with user object containing id, email, createdAt"
  - Bad: "User creation works" (not specific)
- Each criterion MUST be independently verifiable.
- Use domain-specific patterns from `checklist-patterns.md` based on the task type.

### Description Sections
- **Data**: Models, fields, types, relationships, migrations. Write "N/A" if no data changes.
- **API**: HTTP method, path, request body, response shape, status codes. Write "N/A" if no API changes.
- **UI**: Components, pages, interactions, responsive breakpoints, accessibility. Write "N/A" if no UI changes.
