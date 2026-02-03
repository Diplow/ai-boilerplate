---
description: Plan a feature across the DDD architecture layers, analyzing impacted subsystems and surfacing design issues
allowed-tools: ["Read", "Glob", "Grep", "Bash", "Task"]
model: opus
context: fork
---

Plan a feature using the DDD architecture.

## Feature: $ARGUMENTS

First, draft a rough plan:

1. Run `pnpm subsystem-tree` to see the current architecture
2. Identify which layers are impacted (Frontend, API, Domain, Database Schema)
3. For domain-layer changes, identify which domain(s) are affected or if a new domain is needed
4. Outline the changes at each layer

Then, refine the plan by running `/plan-subsystem <path>` for each impacted subsystem. This will surface:

- Boundary violations or responsibility mismatches
- Unanticipated dependencies (treat these as design questions)
- API changes needed

Iterate on the plan based on subsystem feedback until:

- All dependencies are anticipated and justified
- All changes fit within subsystem responsibilities
- No unexpected coupling emerges

## DDD Layer Reference

- **Frontend** (`src/app`): Next.js pages/components. Calls API routes only.
- **API** (`src/server/api`): Orchestrates domains for frontend requests. Only layer that can combine multiple domains.
- **Domain** (`src/lib/domains/<name>`): Isolated business logic. Internal structure: services/ (entry points), actions/ (pure logic), repositories/ (data access), objects/ (types), utils/ (helpers).
- **Database Schema** (`src/server/db`): Drizzle schema. Only imported by repositories.

## Output

Provide a structured plan with:

1. **Execution model**: State upfront that:
   - Each step below must be executed by an opus subagent via the Task tool
   - Each step is self-contained: it includes the context files to read and the work to do
   - Steps are ordered leaf-first (deepest subsystems first) so dependencies are ready when higher layers need them

2. **Summary of the feature**

3. **Key README files**: List the top impacted subsystems' README.md paths. These give a fresh session the architectural context needed before diving into implementation.

4. **Implementation steps**: One step per impacted subsystem (or group of closely related subsystems if work fits in a single session). Ordered leaf-first (deeper subsystems before their parents). Each step names the subsystem path, what to change, and what to create.
   - For work outside any subsystem (deployment config, environment variables, infrastructure), create a dedicated step with a descriptive tag (e.g., `[infra]`, `[config]`).
   - When multiple subsystems need wiring at a higher level, consider a dedicated integration step. Skip it when a single layer (like API) naturally serves as the integration point.

5. **Dependencies to declare**

6. **Key assumptions, open questions, or risks**: Surface assumptions made about the feature's scope or behavior — these create a feedback opportunity before implementation begins.
