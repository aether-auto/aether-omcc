# Checklist Patterns

Acceptance criteria templates organized by task type. When generating TODO acceptance criteria, select the relevant pattern(s) and customize with project-specific values (endpoint paths, field names, screen names, status codes).

Every TODO MUST have at least 3 acceptance criteria. Most TODOs will combine patterns from multiple categories.

## Auth Task

```markdown
- [ ] User can register with valid email and password; POST /api/auth/register returns 201
- [ ] User can log in with correct credentials; POST /api/auth/login returns 200 with token
- [ ] User can log out; POST /api/auth/logout invalidates the session/token
- [ ] Passwords are hashed using bcrypt/argon2 (never stored in plaintext)
- [ ] JWT/session token is issued on login and validated on protected routes
- [ ] Protected routes return 401 for unauthenticated requests
- [ ] Protected routes return 403 for unauthorized requests (wrong role)
- [ ] Rate limiting applied to auth endpoints (max N requests per minute)
- [ ] Token expiration is enforced; expired tokens return 401
- [ ] Password reset flow sends email and allows password change via token
```

## CRUD Task

```markdown
- [ ] CREATE: POST /api/{resource} with valid payload returns 201 and created object
- [ ] READ (single): GET /api/{resource}/:id returns 200 with object, 404 if not found
- [ ] READ (list): GET /api/{resource} returns 200 with paginated array (page, limit, total)
- [ ] UPDATE: PUT/PATCH /api/{resource}/:id with valid payload returns 200 with updated object
- [ ] DELETE: DELETE /api/{resource}/:id returns 204, subsequent GET returns 404
- [ ] Validation: invalid payloads return 400 with descriptive error messages
- [ ] Pagination: list endpoint supports ?page=N&limit=N with sensible defaults
- [ ] Search/filter: list endpoint supports ?q=term or ?field=value (if applicable)
- [ ] Sorting: list endpoint supports ?sort=field&order=asc|desc (if applicable)
```

## UI Component Task

```markdown
- [ ] Component renders correctly with expected content visible
- [ ] Responsive: displays correctly at 320px (mobile), 768px (tablet), 1024px+ (desktop)
- [ ] Accessible: all interactive elements are keyboard navigable (Tab, Enter, Escape)
- [ ] Accessible: ARIA labels/roles present on non-semantic interactive elements
- [ ] Loading state: spinner or skeleton displayed during async data fetch
- [ ] Error state: user-friendly error message displayed on fetch failure
- [ ] Empty state: appropriate message when no data exists
- [ ] Design tokens: uses project color palette, typography, spacing consistently
- [ ] Interactions: click/hover/focus states are visually distinct
```

## API Endpoint Task

```markdown
- [ ] Returns correct success status code (200/201/204) with expected response shape
- [ ] Returns 400 for malformed request body with { error: { code, message } } shape
- [ ] Returns 404 for non-existent resources
- [ ] Returns 401 for unauthenticated requests (if protected)
- [ ] Returns 403 for unauthorized requests (if role-restricted)
- [ ] Returns 500 with generic error message for unexpected server errors (no stack traces in production)
- [ ] Input validation: required fields enforced, types checked, length/range limits applied
- [ ] Rate limiting: public endpoints limited to N requests per minute per IP
- [ ] Response time: endpoint responds within acceptable latency (< 500ms for simple queries)
```

## Database Migration Task

```markdown
- [ ] Migration creates/alters tables as specified with correct column types
- [ ] Migration runs forward without errors on a clean database
- [ ] Migration rolls back without errors and without data loss
- [ ] Foreign key indexes are created for all relationship columns
- [ ] Indexes created on columns used in WHERE/ORDER BY clauses
- [ ] Seed data inserts successfully after migration
- [ ] Existing data is preserved (no destructive changes to populated tables)
- [ ] Unique constraints applied where specified (e.g., email, username)
- [ ] NOT NULL constraints applied where specified with sensible defaults
```

## Real-Time Task

```markdown
- [ ] Events emit correctly when relevant state changes occur
- [ ] Connected clients receive updates within 1 second of the triggering action
- [ ] New client connections receive current state on initial sync
- [ ] Client handles reconnection gracefully after network interruption
- [ ] Server cleans up disconnected client subscriptions
- [ ] Multiple concurrent clients each receive correct, isolated updates
- [ ] Event payload contains all necessary data (no extra round-trip needed)
```

## File Upload Task

```markdown
- [ ] Upload accepts valid file types (e.g., .jpg, .png, .pdf) specified in requirements
- [ ] Upload rejects invalid file types with descriptive error message
- [ ] File size limit enforced (e.g., max 10MB); oversized files rejected with 413
- [ ] Upload progress indicator displays percentage during transfer
- [ ] Uploaded files are accessible via a stable URL after upload completes
- [ ] Failed uploads are cleaned up (no orphaned files in storage)
- [ ] Concurrent uploads from the same user are handled correctly
- [ ] File metadata (name, size, type, uploadedAt) stored in database
```

## Payment Task

```markdown
- [ ] Payment form collects card details securely (PCI compliance, no raw card data stored)
- [ ] Successful payment returns confirmation with transaction ID
- [ ] Failed payment displays user-friendly error with retry option
- [ ] Payment amounts match cart/order totals exactly (no rounding errors)
- [ ] Webhook processes payment provider callbacks idempotently
- [ ] Refund flow processes correctly and updates order status
- [ ] Payment state transitions are logged for audit trail
```

## Search Task

```markdown
- [ ] Search returns relevant results for exact term matches
- [ ] Search returns relevant results for partial/fuzzy matches
- [ ] Search results are paginated with total count
- [ ] Search highlights matching terms in results (if UI)
- [ ] Empty search query returns sensible default (all items or error)
- [ ] Search performs within acceptable latency (< 500ms for typical queries)
- [ ] Search indexes are created and maintained for searched fields
```

## Notification Task

```markdown
- [ ] Notification triggers on the correct event/action
- [ ] Notification content includes relevant context (who, what, when)
- [ ] User receives notification via specified channel (email, in-app, push)
- [ ] Notification preferences are respected (user can opt out)
- [ ] Duplicate notifications are prevented for the same event
- [ ] Notification read/unread state tracks correctly
- [ ] Notification list displays in reverse chronological order
```

## Combining Patterns

Most TODOs will draw criteria from multiple patterns. For example, a "User Registration" TODO would combine:
- Auth patterns (register, password hashing)
- API endpoint patterns (status codes, validation, error shape)
- UI component patterns (form, responsive, accessible, loading/error states)
- Database migration patterns (User table, indexes, constraints)

Select the relevant criteria from each pattern, customize with project-specific values, and ensure the total is at least 3.
