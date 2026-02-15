---
trigger: always_on
---

---

description: 'Project development standards and best practices'
applyTo: '**/\*.jsx, **/_.tsx, \*\*/_.js, \*_/_.ts

---

## Project Context

- React 19+, Expo SDK 54+, React Native 0.81+
- TypeScript, functional components with hooks, component composition.

## Development Standards

### Project Structure

- Expo/React Native with `expo-router` (routing in `src/app`).
- UI: Components in `src/components/` (index-export pattern, styles in component or `styles.ts`).
- Network: `axios` + `@tanstack/react-query` (e.g., `src/hooks/usePokemonList.ts`).
- State: React Contexts in `src/store/` with helper hooks.

### Architecture

- Functional components with arrow functions; composition over inheritance.
- Feature/domain organization; clear presentational/container separation.
- Custom hooks for stateful logic.
- Helpers in `src/utils/helpers.ts` (named exports).

### Key Patterns & Conventions

- Component folders: `index.ts` re-exports main component and types.
- Nested components: complex UI bits go under parent folders.
- Hooks: `use*` naming, colocated in `src/hooks/`.
- TypeScript: Use aliases (`@/* -> src/*`) defined in `tsconfig.json`.
- Consistency: Use `export default` for main components, named exports for utilities.
- Constants: Avoid magic numbers; use `src/constants/` (api, colors, etc.).
- Types: `types.ts` per component; global types in `src/types/index.ts`.
- Config IDs: Use typed enums/unions instead of raw strings.

### TypeScript Integration

- Interfaces for props/state; types for handlers/refs.
- Generic components; strict mode.
- Built-in React types (`React.FC`, `React.ComponentProps`).

### Component Design & State

- Single responsibility; descriptive naming.
- Small, focused, testable, reusable.
- `useState` for local state; React Query/SWR for server state.
- Consider Zustand for complex side state.

### Hooks, Effects & Styling

- `useEffect` with proper dependencies and cleanup.
- Custom hooks for reuse; follow rules of hooks.
- `useRef` for DOM/mutable values.
- Uniwind (Tailwind): classes directly in components.
- Constants for colors (`src/constants/colors.ts`) and shared styles (`src/styles/sharedStyles.ts`).

### Performance & Optimization

- `React.memo`, `useMemo`, `useCallback` judiciously.
- Code splitting (`React.lazy`, `Suspense`).
- FlashList for performant list rendering.

### Data Fetching & Error Handling

- React Query: handle loading, error, success, race conditions.
- Optimistic updates; caching; offline handling.
- `tryCatch` helper in `src/utils/helpers.ts`.
- Error Boundaries; meaningful fallback UIs; proper logging.

### Forms, Routing & Navigation

- Controlled components; libraries like React Hook Form.
- Expo-router file-based routing (`src/app/`).
- Preserve structure: new screens go in `src/app/`.

### Testing & Security

- Unit tests (`.test.tsx`) alongside components (Jest, React Testing Library).
- Mock dependencies/APIs; test behavior, not implementation.
- XSS prevention: sanitize inputs, escape data.
- HTTPS for APIs; avoid sensitive storage in localStorage.

### Security & Build Tools

- Repo prefers Bun (`bun install`, `bun.lock`).
- `expo start` for dev; SVGs via `react-native-svg-transformer`.
- Husky for pre-commit linting; GPG signing may be disabled locally.

### Important files to inspect

- Entry: [src/app/\_layout.tsx](src/app/_layout.tsx)
- Routes: `src/app/*`
- API / Colors: `src/constants/`
- Hooks / Store: `src/hooks/`, `src/store/`
- Config: `metro.config.js`, `tsconfig.json`
