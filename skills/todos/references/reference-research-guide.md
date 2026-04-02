# Reference Implementation Research Guide

## Purpose

For each TODO generated, find 2-3 real-world implementations of the same pattern in popular open-source codebases. This gives agents concrete, battle-tested examples to follow rather than inventing patterns from scratch.

## Research Protocol

### For Each TODO:
1. **Identify the core technical pattern** (e.g., "JWT auth with refresh tokens", "CRUD with pagination", "WebSocket real-time updates")
2. **Spawn a researcher agent** to find popular implementations:
   - WebSearch: `"best {pattern} implementation {framework} github site:github.com"`
   - WebSearch: `"{pattern} example {framework} stars:>1000"`
   - Look for repos with 1000+ stars — battle-tested code
3. **Select 2-3 best references** — prioritize:
   - Official framework examples/starters
   - Well-known open-source projects
   - Projects with active maintenance (recent commits)
4. **Document findings** in the TODO's `## Reference Implementations` section

## Pattern-to-Search Mappings

### Authentication & Authorization
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| JWT auth | `next-auth jwt session` | next-auth, lucia-auth |
| OAuth/OIDC | `oauth2 {framework} integration` | passport.js, arctic |
| RBAC permissions | `role based access control {framework}` | casl, casbin |
| Session management | `session management {framework}` | iron-session, express-session |

### Data & CRUD
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| REST CRUD | `rest api crud {framework} example` | nestjs starter, express-generator |
| GraphQL API | `graphql {orm} {framework}` | graphql-yoga, apollo-server |
| Pagination | `cursor pagination {orm}` | prisma examples, relay |
| Search/Filter | `full text search {db} {framework}` | meilisearch, typesense |

### Real-Time
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| WebSocket | `websocket {framework} real-time` | socket.io, ws |
| SSE | `server sent events {framework}` | - |
| Pub/Sub | `pub sub {framework} {db}` | redis, nats |
| Optimistic UI | `optimistic update react mutation` | tanstack-query, swr |

### File Handling
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| File upload | `file upload {framework} multipart` | multer, formidable |
| Image processing | `image resize {framework} sharp` | sharp, jimp |
| S3 storage | `s3 upload {framework}` | aws-sdk examples |

### UI Components
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| Dashboard layout | `dashboard layout react sidebar` | shadcn/ui, tremor |
| Data table | `data table react sortable filterable` | tanstack-table |
| Form handling | `form validation react {library}` | react-hook-form, formik |
| Modal/Dialog | `modal dialog accessible react` | radix-ui, headless-ui |

### Database
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| Migrations | `database migration {orm} example` | prisma migrations, drizzle |
| Seeding | `database seed {orm} faker` | prisma seed examples |
| Multi-tenancy | `multi tenant {db} {framework}` | - |
| Soft deletes | `soft delete {orm} pattern` | - |

### DevOps & Infrastructure
| Pattern | Search For | Example Repos |
|---------|-----------|---------------|
| CI/CD | `github actions {framework} ci` | - |
| Docker | `dockerfile {framework} production` | - |
| Environment config | `environment variables {framework} validation` | envalid, t3-env |

## Reference Format in TODO Files

```markdown
## Reference Implementations
- **[repo-name](https://github.com/org/repo)**: {What pattern it demonstrates}
  - Key file: `path/to/relevant/file.ts`
  - Pattern: {Brief description of how they solved it}
  - Takeaway: {What to adopt from this approach}
- **[repo-name-2](https://github.com/org/repo2)**: {What pattern it demonstrates}
  - Key file: `path/to/relevant/file.ts`
  - Pattern: {Brief description}
  - Takeaway: {What to adopt}
```

## Quality Criteria for References
- ✅ Repo has 1000+ GitHub stars (proven in production)
- ✅ Recent activity (commits within last 6 months)
- ✅ Relevant to the specific framework/language in the plan
- ✅ Pattern is clearly documented or easy to follow in code
- ❌ Toy/demo projects with no real-world usage
- ❌ Outdated repos with deprecated patterns
- ❌ Different language/framework than the project uses

## Max References Per TODO
- **3 references maximum** per TODO to avoid information overload
- Prefer quality over quantity — one excellent reference beats three mediocre ones
- If no high-quality reference exists, note "No well-established pattern found — implement based on framework docs"
