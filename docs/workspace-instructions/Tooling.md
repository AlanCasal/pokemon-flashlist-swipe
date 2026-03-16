## Tooling

- Install and upgrade Expo-owned packages with `expo install` so all Expo modules stay on the same SDK line; avoid mixing Expo package majors manually in `package.json`.
- Install deps with `bun install` (preferred).
- Run formatting/linting with `bun run format:fix`.
- Start app with `bun run start` (or `expo start`).
- For native package changes, run `bunx expo prebuild --clean --platform all` (or its alias `bpall`) for rebuild flow.
- Repo note: when changing staged-file tooling, keep `scripts/precommit-checks.mjs` aligned with ESLint ignore patterns so ignored paths like `src/components/clerk/**` are filtered before lint runs.
