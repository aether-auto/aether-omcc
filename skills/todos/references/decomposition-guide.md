# Decomposition Guide

Rules for breaking a plan into exhaustive, well-structured TODO items.

## Core Principles

### 1. Vertical Slices Over Horizontal Layers

**DO**: Create TODOs that deliver end-to-end value across the stack.
```
TODO-010: Implement user registration
  - Data: User model, migration
  - API: POST /api/auth/register
  - UI: Registration form, validation feedback
```

**DON'T**: Create TODOs that only address one layer.
```
TODO-010: Create User model          (horizontal -- no value alone)
TODO-011: Create registration API     (horizontal -- no value alone)
TODO-012: Create registration form    (horizontal -- no value alone)
```

Exception: Foundation tasks (base models, shared layouts, auth setup) are legitimately thin slices because they enable many features.

### 2. INVEST Quality Validation

Every TODO must pass INVEST criteria:

| Criterion | Test | Fail Example |
|-----------|------|--------------|
| **I**ndependent | Can be completed without waiting for unrelated TODOs | "Implement search" depends on "Implement CSS framework" |
| **N**egotiable | Implementation details are flexible | "Use exactly this SQL query" (over-specified) |
| **V**aluable | Delivers something the user/stakeholder cares about | "Refactor internal helper" with no visible impact |
| **E**stimable | Can estimate effort with reasonable confidence | "Integrate with TBD third-party service" |
| **S**ized | Fits the 8/80 guideline (1-4 hours agent work) | "Implement entire auth system" (too large) |
| **T**estable | Has specific, verifiable acceptance criteria | "App should feel fast" (not testable) |

### 3. The 8/80 Guideline

Each TODO should represent 1-4 hours of focused agent work.

**Too small** (under 1 hour): Merge with a related TODO.
- "Add email field to User model" -- merge into the User registration TODO.

**Too large** (over 4 hours): Split into smaller vertical slices.
- "Implement authentication system" -- split into: registration, login, logout, password reset, session management, role-based access.

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

## Exhaustiveness Checklist

After generating all TODOs, verify:

- [ ] Every API endpoint mentioned in the plan has a TODO
- [ ] Every data model mentioned in the plan has a TODO
- [ ] Every UI screen/page mentioned in the plan has a TODO
- [ ] Every integration point mentioned in the plan has a TODO
- [ ] Error handling is covered
- [ ] Testing is covered (at the level specified in the plan)
- [ ] Auth and authorization are fully covered
- [ ] Database migrations are covered
- [ ] Configuration and environment setup is covered
- [ ] No TODO has fewer than 3 acceptance criteria
- [ ] All dependencies form a valid DAG
- [ ] All TODOs pass INVEST criteria
