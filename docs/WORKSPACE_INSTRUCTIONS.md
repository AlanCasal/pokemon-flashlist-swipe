# Workspace Instructions

This file is the workspace instructions entrypoint.

## How To Load

- Always read this file before editing or creating files in the repo.
- Do not read every topic file by default.
- After reading this file, load only the relevant topic files from `docs/workspace-instructions/`.
- If a task touches multiple areas, load all matching topic files.
- If a task is broad or unclear, start with `Architecture.md` and then add the most relevant topic files.

## Topic Files

- `docs/workspace-instructions/Architecture.md`
  Use for component structure, feature folder layout, shared UI reuse, hooks, types, exports, and import conventions.
- `docs/workspace-instructions/Styling.md`
  Use for styles, `StyleSheet`, dynamic style factories, insets, and color usage.
- `docs/workspace-instructions/Routing.md`
  Use for `expo-router`, protected/public route placement, tabs, and sign-out navigation flows.
- `docs/workspace-instructions/Testing.md`
  Use for test placement, mocking strategy, behavior-first assertions, and coverage workflow.
- `docs/workspace-instructions/Tooling.md`
  Use for package installation, bun commands, lint/format commands, prebuild flow, and staged-file tooling notes.
- `docs/workspace-instructions/Internationalization.md`
  Use for translations, `i18next`, language persistence, and locale-sensitive font guidance.

## Maintenance

- Treat all workspace-instruction files as non-mandatory workspace preferences. Improvements are welcome.
- Update the affected topic file in the same PR when conventions or patterns change.
- Update this file too when the loading workflow changes or when a new topic file is introduced.
