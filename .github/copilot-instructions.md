## Purpose

This file gives AI coding agents the minimum, actionable context to be productive in this repo.

High-level architecture

- App type: Expo / React Native with TypeScript using `expo-router` (file-based routing under `src/app`). See [src/app/\_layout.tsx](src/app/_layout.tsx#L1-L1).
- UI: Small component library under `src/components/` — components export from `index.ts` and keep presentation in `styles.ts` (example: [src/components/PokeCard/PokeCard.tsx](src/components/PokeCard/PokeCard.tsx#L1-L1)).
- Data: Network layer uses `axios` + `@tanstack/react-query` for caching and infinite queries. Key hook: [src/hooks/usePokemonList.ts](src/hooks/usePokemonList.ts#L1-L1).
- Global state: Lightweight React Contexts in `src/store/` (e.g., `SavedContext`, `ToastContext`) with helper hooks and separate `*Value` providers for initialization (see [src/store/SavedContext](src/store/SavedContext/)).

Routing & navigation

- Routes are file-based under `src/app`. Routes with parentheses (e.g. `(tabs)`) group navigation — follow `expo-router` conventions. The root layout is [src/app/\_layout.tsx](src/app/_layout.tsx#L1-L200).

Key patterns & conventions

- Re-export pattern: component folders expose a small `index.ts` that re-exports the main component and types.
- Styling: persistent pattern is `styles.ts` alongside each component and feature folder.
- Nested components: complex UI bits are nested under their parent (example: `src/components/PokeCard/Image/PokemonImage.tsx`).
- Hooks: named `use*`, colocated in `src/hooks/`, return React Query hooks or encapsulate local logic (see `usePokemonList`).
- TypeScript paths: aliases are defined in `tsconfig.json` (e.g. `@/* -> src/*`) — use these imports in any edits.

Build / dev / tools

- Install: repo now prefers Bun. Run `bun install` (creates `bun.lock`), or fall back to `npm install` if needed.
- Start dev server: use the `package.json` script: `expo start` (or `bun run start`). Metro / Expo expect a Node runtime — running `expo start` with Node is the most reliable option.
- Metro config: SVGs are handled via `react-native-svg-transformer` and `metro.config.js` is already configured.
- Lint & format: scripts exist in `package.json` (`lint`, `lint:fix`, `prettier`, `prettier:fix`, `format:fix`). The codebase uses ESLint + Prettier; run `bun run format:fix` or `npm run format:fix` before committing.

Important files to inspect for context

- App entry & layout: [src/app/\_layout.tsx](src/app/_layout.tsx#L1-L200)
- Routes: `src/app/*` (file-based routing)
- API constants: [src/constants/api.ts](src/constants/api.ts#L1-L20)
- Hooks: `src/hooks/*` (`usePokemonList.ts`, `usePokemonDetails.ts`, etc.)
- Stores / contexts: `src/store/*` (SavedContext, ToastContext)
- Metro/Babel: `metro.config.js`, `babel.config.js` (SVG transform, Expo preset)
- TypeScript config: `tsconfig.json` (paths and `expo/tsconfig.base` extend)

Integration & external dependencies

- Major libs: `expo`, `react-native`, `@tanstack/react-query`, `axios`, `@shopify/flash-list`.
- API backend: public PokeAPI — base URL in `src/constants/api.ts`.
- Native integration: some packages require native rebuilds (e.g., `react-native-reanimated`, `react-native-svg`) — for native changes use `expo prebuild` / rebuild flows.

Agent guidance: actionable rules

- Preserve file-based routing: when adding a screen, create files under `src/app/` rather than editing central route registries.
- Follow component folder conventions: `index.ts` + `Component.tsx` + `styles.ts` (+ nested subcomponents folder when needed).
- Use existing hooks & context providers: prefer adding helpers in `src/hooks/` and `src/store/` instead of introducing new global singletons.
- Imports: prefer `@/` or `@components/` aliases from `tsconfig.json` — this keeps paths consistent.
- Dependency changes: run `bun install` locally and commit `bun.lock`. Do not reintroduce `package-lock.json` or `yarn.lock` without team agreement.
- Commits: repo has Husky configured — ensure pre-commit linting still passes. If GPG signing issues occur, local repo config may disable signing.

If unsure what to change

- Inspect `src/app/_layout.tsx` for high-level providers and `src/components` for UI conventions.
- Search for patterns: `styles.ts`, `index.ts` in component folders, and `use*` in `src/hooks`.

Next steps for me

- Ask clarifying questions if you want the agent to make edits (e.g., add a screen, change network logic, or refactor a component).

Feedback

- Tell me if you'd like this file shortened, expanded with more examples, or to include CI-specific instructions (GitHub Actions workflows).
