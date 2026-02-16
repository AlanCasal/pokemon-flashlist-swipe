---
description: 'Project development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts'
---

## Project Snapshot

- Stack: React 19, React Native 0.81, Expo SDK 54, TypeScript.
- Routing: `expo-router` file-based routes in `src/app/`.
- Styling: maximize use of `uniwind` (`className` first), fallback to inline styles only when needed.
- Server state: `@tanstack/react-query` in hooks under `src/hooks/`.
- Client state: `zustand` stores in `src/store/`, persisted with `react-native-mmkv` where required.
- Core UI/runtime libs in use: `@shopify/flash-list`, `expo-image`, `react-native-reanimated`, `react-native-svg`, `@gorhom/bottom-sheet`.

## Code Priorities

- Prioritize readability and maintainability over cleverness.
- Keep implementations small and focused.
- Optimize performance without sacrificing clarity.

## Architecture & Conventions

- Use functional components and hooks.
- Prefer composition over inheritance.
- Keep routes under `src/app/` (do not add central route registries).
- Keep reusable UI in `src/components/<Feature>/` with local `index.ts` re-exports.
- Keep reusable logic in `src/hooks/` (`use*` naming).
- Keep shared types in `src/types/`; colocate feature-specific complex types in local `types.ts`.
- Use `export default` for main components and named exports for helpers/utilities.
- Use TypeScript path aliases (`@/* -> src/*`) for imports.

## State, Data & Error Handling

- Use `useState` for local component state.
- Use Zustand for cross-screen client state.
- Use React Query for remote data, caching, and pagination.
- Handle loading/error/success states explicitly.
- Use `tryCatch` from `src/utils/helpers.ts` when suitable for async flows.

## Styling

- Prefer Uniwind utility classes directly in `.tsx` files.
- Use tokens/constants from `src/constants/` (especially colors and shared values).
- Use inline style/`StyleSheet` only for dynamic values or unsupported utility cases.

## Routing, Testing & Tooling

- Follow `expo-router` conventions (including grouped routes like `(tabs)`).
- Add tests close to source files (`*.test.ts` / `*.test.tsx`) and test behavior over implementation.
- Install deps with `bun install` (preferred).
- Run formatting/linting with `bun run format:fix`.
- Start app with `bun run start` (or `expo start`).
- For native package changes, run the proper `expo prebuild` / rebuild flow.

## Implementation Process

1. Confirm requirements and existing patterns in adjacent files.
2. Define or update types first when needed.
3. Implement minimal UI/logic changes in the correct feature location.
4. Wire state/data flow (local state, Zustand, React Query).
5. Add loading/error/empty states.
6. Add or update focused tests near changed code.
7. Run lint/format and relevant checks.
8. Update docs/instruction files when architecture or packages change.

## Common Patterns

- Feature-first component structure with re-export `index.ts` files.
- Custom hooks for reusable stateful logic.
- Container/presentational separation where complexity justifies it.
- Shared constants for non-trivial numbers/strings (avoid magic values).

## Practical Examples

- Root layout and router entry: [src/app/\_layout.tsx](src/app/_layout.tsx)
- Route screen example: [src/app/details.tsx](src/app/details.tsx)
- Infinite query hook: [src/hooks/usePokemonList.ts](src/hooks/usePokemonList.ts)
- Zustand stores: [src/store/savedStore.ts](src/store/savedStore.ts), [src/store/toastStore.ts](src/store/toastStore.ts)
- Component re-export pattern: [src/components/PokeCard/index.ts](src/components/PokeCard/index.ts)
- API and design constants: [src/constants/api.ts](src/constants/api.ts), [src/constants/colors.ts](src/constants/colors.ts)
- Alias/config references: [tsconfig.json](tsconfig.json), [babel.config.js](babel.config.js), [metro.config.js](metro.config.js)

## Keep This File Current

- Update this file in the same PR when package usage, architecture, or conventions change.
- Ensure package/library statements match `package.json`.
- Remove stale guidance instead of adding exceptions.
- Keep guidance concise, specific, and example-driven.
