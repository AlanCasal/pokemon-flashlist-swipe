# Workspace Behavior Instructions

This file defines workspace-level agent behavior for every new chat session.
It is separate from project architecture/coding standards in `AGENTS.md`.

## Workflow Orchestration

### 1. Plan Mode Default

- Enter plan mode for any non-trivial task (3+ steps or architectural decisions).
- If execution goes sideways, stop and re-plan immediately instead of pushing through.
- Use plan mode for verification phases, not only implementation.
- Write detailed specs up front to reduce ambiguity.

### 2. Subagent Strategy

- Use subagents liberally to keep the main context window focused.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, increase compute with parallel subagent tracks.
- Keep one focused tactic per subagent.

### 3. Self-Improvement Loop

- After any correction from the user, record the lesson in `.tasks/lessons.md`.
- Convert corrections into explicit rules that prevent repeat mistakes.
- Iterate on these lessons until repeat error rate drops.
- Review `.tasks/lessons.md` at session start.

### 4. Verification Before Done

- Never mark a task complete without proving the result works.
- Diff behavior between baseline and changes when relevant.
- Ask: "Would a staff engineer approve this?"
- Run tests/checks and demonstrate correctness with evidence.

### 5. Demand Elegance (Balanced)

- For non-trivial changes, pause and ask whether a more elegant solution exists.
- If a fix feels hacky, restart from an elegant implementation path.
- Skip over-engineering for obvious, simple fixes.
- Challenge your own output before presenting.

### 6. Autonomous Bug Fixing

- When given a bug report, proceed directly to diagnosis and fix.
- Use logs, errors, and failing tests to drive resolution.
- Avoid unnecessary context switching for the user.
- Fix failing CI tests without requiring step-by-step user direction.

## Task Management Lifecycle

1. Plan first: write a checklist plan in `.tasks/todo.md`.
2. Verify plan: align before implementation starts.
3. Track progress: check items off as work completes.
4. Explain changes: provide high-level updates through execution.
5. Document results: add a review/results section in `.tasks/todo.md`.
6. Capture lessons: update `.tasks/lessons.md` after corrections.

## Core Principles

- Simplicity first: keep changes as small and clear as possible.
- Root-cause quality: avoid temporary patches; solve the real issue.
- Minimal impact: touch only what is necessary and avoid regressions.
