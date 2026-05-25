# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Session Bootstrap

- Reply in English unless the user explicitly requests another language.
- Before editing or creating files, load [docs/WORKSPACE_INSTRUCTIONS.md](docs/WORKSPACE_INSTRUCTIONS.md) and then load **only** the relevant topic files it points to under [docs/workspace-instructions/](docs/workspace-instructions/) (`Architecture.md`, `Styling.md`, `Routing.md`, `Testing.md`, `Tooling.md`, `Internationalization.md`). Do not load every topic file by default. If `WORKSPACE_INSTRUCTIONS.md` is missing, alert the developer.
- Treat the workspace-instruction files as **non-mandatory** workspace preferences — improvement suggestions welcome. When architecture/conventions/patterns change, update the affected topic file in the same PR and alert the developer.
- After a user correction, record the lesson as an explicit rule in the relevant topic file under `docs/workspace-instructions/` (and update `WORKSPACE_INSTRUCTIONS.md` if the loading workflow itself changes).

## Workflow

- Default to **Plan Mode** for non-trivial tasks (3+ steps or architectural decisions) and for verification phases, not just implementation. If you can't switch modes yourself, ask the developer to switch.
- Use subagents liberally — offload research, exploration, and parallel analysis; one focused tactic per subagent — to keep the main context window clean.
- Never mark a task complete without proving it works: diff against baseline when relevant, run tests/checks, and show evidence.
- Fix all lint/TS warnings and errors before declaring done. Imports must be sorted (`simple-import-sort/imports`).
- For non-trivial changes, pause and ask whether a more elegant solution exists; if a fix feels hacky, restart from a clean path. Skip the over-engineering for obvious simple fixes.
- For bug reports, proceed directly to diagnosis and fix — use logs, errors, and failing tests to drive resolution without unnecessary context-switching back to the user.

## Commands

This project uses **Bun** (`bun@1.3.4`) as the package manager and task runner.

```bash
bun install              # install deps
bun run start            # expo start (Metro)
bun run ios              # expo run:ios
bun run android          # expo run:android
bun run web              # expo start --web

bun run lint             # eslint . --ext .ts,.tsx
bun run lint:fix         # eslint --fix
bun run prettier         # prettier --check
bun run prettier:fix     # prettier --write
bun run format:fix       # lint:fix + prettier:fix (use this before committing)

bun run test             # jest (watchman disabled)
bun run test:coverage    # jest with coverage → coverage/lcov-report/index.html
bun jest path/to/file.test.tsx              # run a single test file
bun jest -t "matches a name fragment"       # run by test name

bun run prebuild:ios     # expo prebuild --clean --platform ios
bun run prebuild:android # expo prebuild --clean --platform android
bun run prebuild:all     # both platforms
```

Husky + lint-staged runs `eslint` on staged `*.{js,jsx,ts,tsx}` via the `prepare` script.

## Architecture (Big Picture)

**Stack:** Expo 55 / React Native 0.83 / React 19 / TypeScript 5.9, with Expo Router for navigation, FlashList for lists, React Query for server state, Zustand (+ MMKV) for client state, Clerk for auth, Reanimated + Moti + Bottom Sheet for motion, and i18next for localization.

### Routing (Expo Router, file-based)

Entry is `expo-router/entry` (see `package.json#main`). The router tree lives in [src/app/](src/app/) and is split by auth state using route groups:

- `src/app/_layout.tsx` — root layout (providers: Clerk, React Query, gesture handler, i18n, etc.).
- `src/app/(public)/` — unauthenticated routes (`index.tsx`, `sign-in.tsx`, `sign-up.tsx`).
- `src/app/(protected)/` — authenticated routes including `(tabs)/` (Pokédex + Saved), `details.tsx`, `profile.tsx`.

Protected/public placement and tab/sign-out flows are documented in [docs/workspace-instructions/Routing.md](docs/workspace-instructions/Routing.md).

### Source layout

- [src/features/](src/features/) — feature modules (`Auth`, `Home`, `Pokedex`, `Pokemon`, `Profile`). Each feature owns its UI, hooks, helpers, types, and styles. **Feature folder contract:** root `index.ts`, single root `helpers.ts` / `styles.ts` / `types.ts` (no nested copies inside `components/` subfolders), feature-local hooks under `hooks/`, child UI under `components/`, tab content under lowercase `tabs/`.
- [src/components/](src/components/) — shared UI. `common/<Feature>/` for small primitives, `<Feature>/` (e.g. `DetailSheet`, `PokeCard`, `Tabs`, `Toast`) for larger shared shells. Each component folder has its own `index.ts` re-export. **Reuse existing `common/` primitives before adding new ones.**
- [src/hooks/](src/hooks/) — cross-feature `use*` hooks (catalog/list/detail/evolution fetchers, search, debounce, font family).
- [src/store/](src/store/) — Zustand stores (`languageStore`, `savedStore`, `toastStore`) persisted via [src/store/mmkvStorage.ts](src/store/mmkvStorage.ts) (MMKV).
- [src/i18n/](src/i18n/) — i18next setup, `locales/` (en, es, de, ja), and locale-aware typography.
- [src/types/](src/types/) — types reused across features. Feature-specific complex types stay colocated.
- [src/test/](src/test/) — shared test utilities and mocks (e.g. `mocks/svgMock.tsx`).
- [src/utils/](src/utils/), [src/constants/](src/constants/) — shared helpers and constants.

### Conventions worth knowing up front

- **Path aliases** (mirrored in [tsconfig.json](tsconfig.json) and [jest.config.js](jest.config.js)): `@/* → ./` (repo root), `@features/*`, `@components/*`, `@hooks/*`, `@utils/*`, `@constants/*`, `@store/*`, `@assets/*`. Always import via aliases.
- `export default` for the main component of a file; named exports for helpers/utilities.
- SVGs are imported as components via `react-native-svg-transformer` (mocked in tests through `svgMock.tsx`).
- **Forbidden imports** (`no-restricted-imports`, enforced by ESLint): `@react-native-async-storage/async-storage` (use the MMKV-backed stores instead), `styles` from `react-native-markdown-display`, and `SafeAreaView` from `react-native-safe-area-context`.
- `no-console: error` and `react/jsx-no-literals` are on — wrap user-visible strings through i18n; avoid raw `console.*` (use the app's logging path).
- `src/components/clerk/**` is ESLint-ignored; treat it as dev-only sample code.

### Testing

Jest preset `jest-expo` with setup in [jest.setup.ts](jest.setup.ts). Coverage excludes `index.ts`, `styles.ts`, `types.ts`, `src/i18n/locales/**`, and `src/test/**`. Coverage report at `coverage/lcov-report/index.html`. Behavior-first assertions and mocking strategy live in [docs/workspace-instructions/Testing.md](docs/workspace-instructions/Testing.md).
