# Decomposition Guide

Rules for breaking a plan into feature-sized, well-structured TODO items that produce visible, verifiable results.

## Core Principles

### 1. Feature-Sized Vertical Slices

Each TODO should deliver a **complete, user-visible feature** that bundles data, API, and UI together. The user should be able to see and interact with the result after each TODO is completed.

**DO**: Bundle the full stack for a feature into one TODO.
```
TODO-003: Implement user authentication
  - Data: User model, session/token storage
  - API: POST /auth/register, POST /auth/login, POST /auth/logout, GET /auth/me
  - UI: Registration page, login page, auth state in navbar
  - Result: User can register, log in, see their name in the header, and log out
```

**DON'T**: Create separate TODOs per layer or per endpoint.
```
TODO-003: Create User model          (too small -- no visible result)
TODO-004: Create registration API     (too small -- no visible result)
TODO-005: Create login API            (too small -- no visible result)
TODO-006: Create registration form    (too small -- no visible result)
TODO-007: Create login form           (too small -- no visible result)
```

The first approach is ONE TODO. The second is FIVE TODOs that each produce nothing the user can verify until all five are done. Always prefer the first approach.

Exception: Foundation tasks (project setup, base layout, shared config) are allowed to be infrastructure-only since they enable all subsequent features.

### 2. Target 8-15 TODOs Per Project

A good TODO list has **8-15 items** for a typical project. Adjust for complexity:
- Simple project (landing page, basic CRUD): 5-8 TODOs
- Medium project (multi-page app with auth): 8-12 TODOs
- Complex project (real-time, payments, integrations): 12-15 TODOs

**If you have more than 15 TODOs, you are splitting too fine.** Merge related TODOs until you're in range.

**If you have fewer than 5 TODOs, you are bundling too much.** Split large TODOs that cover 4+ screens or 10+ endpoints.

### 3. Each TODO Must Be User-Verifiable

After completing a TODO, the user should be able to:
- Open the app and see something new or changed
- Interact with a feature (click, submit, navigate)
- Verify it works without reading code

**Verifiable**: "Implement task dashboard — user sees their tasks, can filter by status, click to view details"
**Not verifiable**: "Create Task model and add indexes" — nothing visible to the user

### 4. INVEST Quality (Adapted)

| Criterion | Test |
|-----------|------|
| **I**ndependent | Can be completed without waiting for unrelated TODOs |
| **N**egotiable | Implementation details are flexible |
| **V**aluable | Delivers a visible feature the user can verify |
| **E**stimable | Scope is clear enough to estimate |
| **S**ized | Feature-sized — not a micro-task, not the whole app |
| **T**estable | Has specific, verifiable acceptance criteria |

## Decomposition Order

### Foundation First

Generate foundation TODOs before feature TODOs:

1. **Project setup**: Environment config, dependency installation, base project structure.
2. **Database setup**: Database connection, base migration setup, ORM configuration.
3. **Auth foundation**: User model, authentication middleware, session/JWT setup.
4. **Base layouts**: Application shell, navigation, shared UI components.
5. **Shared utilities**: Error handling middleware, validation helpers, logging setup.

### Then Features by Priority

After foundation:

1. **must-have** features: Core MVP features in dependency order.
2. **should-have** features: Secondary features that enhance the MVP.
3. **could-have** features: Nice-to-haves, optimizations, polish.

### Then Cross-Cutting Concerns

After features:

1. **Error handling**: Global error boundaries, API error responses, user-facing error pages.
2. **Testing**: Unit tests, integration tests, e2e tests as specified in the plan.
3. **Documentation**: API docs, deployment guides if specified.
4. **Deployment**: CI/CD, environment configuration, production setup if specified.

## Priority Mapping

| Plan Category | TODO Priority |
|---------------|---------------|
| Core MVP features | must-have |
| Secondary MVP features | should-have |
| Future enhancements | could-have |
| Technical debt / optimization | could-have |
| Foundation / auth / setup | must-have |
| Testing for must-have features | must-have |
| Testing for should-have features | should-have |

## Dependency Rules

1. **Auth before protected resources**: Any TODO that requires authentication depends on the auth foundation TODO.
2. **Shared models before features**: If two features share a model, the model creation TODO comes first.
3. **Base layout before pages**: Page TODOs depend on the layout/shell TODO.
4. **API before UI** (within a slice): If splitting a vertical slice, the API half must precede the UI half.
5. **No circular dependencies**: If A depends on B, B MUST NOT depend on A (directly or transitively).
6. **Minimize dependency chains**: Prefer wide, shallow dependency graphs over deep chains.

## Domain-Specific Criteria Patterns

Apply these patterns based on the type of work in each TODO:

### Auth Tasks
- User can register, login, logout successfully
- Passwords are hashed (never stored in plaintext)
- JWT/session tokens are issued and validated correctly
- Protected routes reject unauthenticated requests with 401
- Rate limiting is applied to auth endpoints
- Token refresh/expiration works correctly

### CRUD Tasks
- Create, read, update, delete operations all function correctly
- Input validation rejects malformed data with descriptive errors
- Proper HTTP status codes (201 created, 200 ok, 204 no content, 404 not found)
- List endpoints support pagination
- Search/filter functionality if specified in plan

### UI Component Tasks
- Component renders correctly with expected content
- Responsive across mobile (320px), tablet (768px), desktop (1024px+)
- Keyboard navigable and ARIA attributes present
- Loading states displayed during async operations
- Error states displayed on failure
- Uses design tokens / consistent styling

### API Endpoint Tasks
- Returns correct HTTP status codes for success and error cases
- Input validation with descriptive error messages
- Error responses follow a consistent shape (e.g., `{ error: { code, message } }`)
- Authentication check applied if endpoint is protected
- Rate limiting if endpoint is public-facing

### Database Migration Tasks
- Migration runs forward successfully
- Migration rolls back without data loss
- Indexes created on foreign keys and frequently queried columns
- Seed data populates correctly
- No breaking changes to existing data

### Real-Time Tasks
- Events emit correctly on state changes
- Connected clients receive updates within acceptable latency
- Reconnection handling works after disconnection
- State synchronization on initial connection

### File Upload Tasks
- Accepts valid file types, rejects invalid ones
- File size limits enforced
- Upload progress indicator displayed
- Cleanup on upload failure (no orphaned files)
- Files accessible after upload

## Coverage & Size Checklist

After generating all TODOs, verify:

**Coverage (every plan item is accounted for in at least one TODO):**
- [ ] Every API endpoint is covered by a TODO (multiple endpoints per TODO is expected)
- [ ] Every data model is covered by a TODO (bundled with its feature)
- [ ] Every UI screen/page is covered by a TODO (bundled with its backend)
- [ ] Every integration point is covered
- [ ] Auth, error handling, database setup, and config are covered

**Quality:**
- [ ] No TODO has fewer than 3 acceptance criteria
- [ ] Each TODO produces a visible, verifiable result the user can see
- [ ] All dependencies form a valid DAG
- [ ] All TODOs pass INVEST criteria

**Size:**
- [ ] Total TODO count is between 5-15 (merge if over 15, split if under 5)
- [ ] No TODO is so large it covers 4+ screens or 10+ endpoints
- [ ] No TODO is so small it only touches one layer with no visible result
