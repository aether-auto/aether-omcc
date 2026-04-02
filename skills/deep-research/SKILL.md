---
name: deep-research
description: Multi-agent deep research using orchestrator-worker pattern for informed planning decisions
level: 3
---

<Purpose>
Deep Research conducts multi-agent research to inform implementation decisions with real-world patterns, authoritative documentation, and best practices. It uses an orchestrator-worker pattern: a lead agent (Opus) creates a research plan, spawns parallel researcher agents (Sonnet) to investigate specific questions, then synthesizes findings into actionable research documents stored in `.omc/research/`.
</Purpose>

<Use_When>
- The plan involves 3+ different technologies in the stack
- Complex integrations are needed (real-time, payments, OAuth/OIDC, file storage, etc.)
- Security-critical features are planned (auth, permissions, data encryption)
- The plan has 5+ tasks
- The project uses newer or less-documented frameworks
- User explicitly invokes `/deep-research`
</Use_When>

<Do_Not_Use_When>
- Plan has fewer than 3 distinct tasks AND uses only 1 well-known technology (e.g., just React)
- Simple CRUD without complex integrations
- User passes `--skip-research` flag
- User says "skip research" or "just build it"
- Research has already been conducted (`.omc/research/summary.md` exists and is current)
</Do_Not_Use_When>

<Why_This_Exists>
Implementation decisions made without research lead to rework. Developers often pick patterns from memory or habit rather than consulting current documentation, missing breaking changes, deprecated APIs, or better alternatives that have emerged. Deep Research front-loads this discovery so the implementation plan is grounded in verified, current patterns rather than assumptions.

The parallel worker approach mirrors Claude's web deep research: instead of one agent doing sequential searches, multiple specialists investigate different questions simultaneously, producing broader coverage in less time.
</Why_This_Exists>

<Phase_1_Research_Planning>
## Lead Agent (Opus) - Research Planning

1. Read the plan from `.omc/plans/` to understand the implementation scope.
2. Read the spec from `.omc/specs/` if available to understand requirements.
3. Analyze the technology stack, integrations, and architecture patterns.
4. Create a research plan with 5-10 specific research questions.

### Example Research Questions
- "What is the recommended auth pattern for Next.js 14 App Router?"
- "How do popular open-source projects structure tRPC + Prisma integrations?"
- "What are the performance implications of SSR vs CSR for this use case?"
- "What accessibility patterns should we follow for the dashboard layout?"
- "What is the current best practice for real-time subscriptions with GraphQL?"
- "How should we structure database migrations for a multi-tenant system?"

### Research Plan Structure
Use the template in `references/research-plan-template.md` to structure the plan:
- Brief project context from spec/plan
- Technology stack identified from the plan
- 5-10 numbered research questions, each with:
  - Why this matters for the project
  - Search strategy (what to search for)
  - Expected output (what kind of answer we need)
- Research constraints (prefer official docs, production-grade patterns, etc.)
</Phase_1_Research_Planning>

<Phase_2_Parallel_Research>
## Worker Agents (Sonnet) - Parallel Research

Spawn 5-10 researcher agents IN PARALLEL (one per research question) using the `researcher` agent definition.

### Each Worker Must:
1. Use **WebSearch** to find authoritative sources (official docs, GitHub repos, blog posts from recognized experts).
2. Use **WebFetch** to read relevant pages and extract key information.
3. Use **context7 MCP tools** (`resolve-library-id`, `query-docs`) for library-specific documentation.
4. Use **Grep**, **Read**, **Glob** to examine the current codebase for existing patterns.
5. Synthesize findings into a structured response via **SendMessage** to the lead agent.

### Worker Constraints
- Each worker is **READ-ONLY** (no Write/Edit tools).
- Focus on current/maintained sources — skip anything older than 2 years unless it is foundational documentation.
- Prefer official documentation over blog posts.
- Maximum 3 primary sources per question to avoid information overload.
- Each finding must include: source URL, key insight, relevance to project, confidence level.

### Parallel Dispatch
```
SubAgent("researcher", question="Q1: What is the recommended auth pattern for Next.js 14 App Router?")
SubAgent("researcher", question="Q2: How do popular open-source projects structure tRPC + Prisma integrations?")
SubAgent("researcher", question="Q3: ...")
...all launched in parallel...
```
</Phase_2_Parallel_Research>

<Phase_3_Synthesis>
## Lead Agent (Opus) - Synthesis

After all worker agents return their findings:

1. **Collect** all worker findings and organize by research question.
2. **Cross-reference** findings — resolve contradictions between sources.
3. **Create** the `.omc/research/` directory with the following structure:

### Output Files

#### `.omc/research/summary.md` — Executive Summary
- Project context (1-2 sentences)
- Technology stack overview
- Key decisions and recommended patterns (bulleted)
- Critical warnings or pitfalls identified
- Overall confidence assessment
- Links to detailed findings

#### `.omc/research/{topic-slug}.md` — Detailed Findings (one per question)
Each file includes:
- **Question Asked** — The original research question
- **Sources Consulted** — URLs with brief descriptions
- **Key Findings** — Bulleted list of discoveries
- **Recommended Approach** — What to do based on findings
- **Pitfalls to Avoid** — Common mistakes or anti-patterns found
- **Confidence Level** — High / Medium / Low with justification

### Synthesis Rules
- When sources contradict, prefer: official docs > well-maintained OSS examples > recent blog posts.
- When confidence is low, note what additional information would raise it.
- Flag any findings that contradict the current plan — these need plan revision.
- Include code snippets from documentation only when they directly illustrate a recommended pattern.
</Phase_3_Synthesis>

<Smart_Detection_Heuristics>
## Deciding Whether to Run or Skip

Before executing research, analyze the plan to determine if research adds value.

### SKIP Research If ALL of These Are True
- Plan has fewer than 3 distinct tasks/features
- Uses only 1 well-known, mature technology (plain React, Express CRUD, vanilla Node.js, etc.)
- No complex integrations (no real-time, no payments, no OAuth, no third-party APIs)
- No security-critical features (no auth, no permissions, no data encryption)
- The `--skip-research` flag was passed

### RUN Research If ANY of These Are True
- 3+ different technologies in the stack (e.g., Next.js + Prisma + Redis + Stripe)
- Complex integrations planned (real-time/WebSocket, payment processing, OAuth/OIDC, file storage, email sending)
- Security-critical features (authentication, authorization/RBAC, data encryption, API key management)
- 5+ tasks in the implementation plan
- Uses newer or less-documented frameworks (released within last 12 months, or niche)
- Plan references specific library versions or migration paths
- User explicitly requests research

### When Skipping
If the heuristics determine research should be skipped:
1. Log the reason for skipping (e.g., "Simple CRUD app with single well-known technology")
2. Emit `PIPELINE_RESEARCH_COMPLETE` immediately
3. Do not create the `.omc/research/` directory
</Smart_Detection_Heuristics>

<Completion>
When all research files are written to `.omc/research/` (or research is skipped), emit:

```
PIPELINE_RESEARCH_COMPLETE
```

The next pipeline stage can then reference `.omc/research/summary.md` for informed decision-making.
</Completion>
