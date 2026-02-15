---
description: 'Project development standards and best practices'
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts
---

## Project Context

- Latest React version (React 19+), Expo SDK 54+, React Native 0.81+
- TypeScript for type safety (when applicable)
- Functional components with hooks as default
- Implement proper component composition and reusability patterns

## Development Standards

### Project Structure

- App type: Expo / React Native with TypeScript using `expo-router` (file-based routing under `src/app`). See [src/app/\_layout.tsx](src/app/_layout.tsx#L1-L1).
- UI: Small component library under `src/components/` — components export from `index.ts` and keep presentation in `styles.ts` (example: [src/components/PokeCard/PokeCard.tsx](src/components/PokeCard/PokeCard.tsx#L1-L1)).
- Data: Network layer uses `axios` + `@tanstack/react-query` for caching and infinite queries. Key hook: [src/hooks/usePokemonList.ts](src/hooks/usePokemonList.ts#L1-L1).
- Global state: Lightweight React Contexts in `src/store/` (e.g., `SavedContext`, `ToastContext`) with helper hooks and separate `*Value` providers for initialization (see [src/store/SavedContext](src/store/SavedContext/)).

### Architecture

- Use functional components with hooks as the primary pattern
- Whenever possible, prefer arrow functions over normal functions
- Implement component composition over inheritance
- Organize components by feature or domain for scalability
- Separate presentational and container components clearly
- Use custom hooks for reusable stateful logic
- Implement proper component hierarchies with clear data flow
<!-- - If project doesn't use Nativewind, Uniwind or similar, use an index.ts file, ComponentName.tsx for the component, and styles.ts for the styles. index.ts should export the component with export { default } from './ComponentName' -->
- Add helpers and utilities in separate files under `src/utils/helpers.ts` with named exports.

### Key patterns & conventions

- Re-export pattern: component folders expose a small `index.ts` that re-exports the main component and types.
- Nested components: complex UI bits are nested under their parent (example: `src/components/PokeCard/Image/PokemonImage.tsx`).
- Hooks: named `use*`, colocated in `src/hooks/`, return React Query hooks or encapsulate local logic (see `usePokemonList`).
- TypeScript paths: aliases are defined in `tsconfig.json` (e.g. `@/* -> src/*`) — use these imports in any edits.
- Use export default for main components (example: export { default } from './ComponentName')
- Use named exports for utilities and helper functions (example: export const helper = () => {})
- Don't add 'magic numbers' or string literals directly in the code — add them as constants in `src/constants/` (example: `src/constants/api.ts` for API endpoints, `src/constants/colors.ts` for color values).
- Use a type file (e.g., `types.ts`) in each component folder for complex types related to that component, and a global `src/types/index.ts` for shared types across the app. Avoid inline type definitions in component files when they are complex or reused.
- For IDs/variants used in component config arrays (e.g., action IDs), avoid raw string literals in component files; define a typed enum or union-backed constant in `types.ts` (or `src/constants/` when broadly shared) and reuse it.

### TypeScript Integration

- Use TypeScript interfaces for props, state, and component definitions
- Define proper types for event handlers and refs
- Implement generic components where appropriate
- Use strict mode in `tsconfig.json` for type safety
- Leverage React's built-in types (`React.FC`, `React.ComponentProps`, etc.)
- Create union types for component variants and states
- Add new types to `src/types/index.ts` for global accessibility
- Use TypeScript paths for cleaner imports (defined in `tsconfig.json`)

### Component Design

- Follow the single responsibility principle for components
- Use descriptive and consistent naming conventions
- Implement proper prop validation with TypeScript or PropTypes
- Design components to be testable and reusable
- Keep components small and focused on a single concern
- Use composition patterns (render props, children as functions)

### State Management

- Use `useState` for local component state
  <!-- - Implement `useReducer` for complex state logic -->
  <!-- - Leverage `useContext` for sharing state across component trees -->
- Consider Zustand for complex applications <!-- external state management (Redux Toolkit) -->
- Implement proper state normalization and data structures
- Use React Query or SWR for server state management

### Hooks and Effects

- Use `useEffect` with proper dependency arrays to avoid infinite loops.
- `useEffect` hooks should be placed after the main component logic and before any return statements.
- Implement cleanup functions in effects to prevent memory leaks
- Create custom hooks for reusable stateful logic
- Follow the rules of hooks (only call at the top level)
- Use `useRef` for accessing DOM elements and storing mutable values

### Styling

<!-- - Use CSS Modules, Styled Components, or modern CSS-in-JS solutions -->
<!-- - Follow BEM methodology or similar naming conventions for CSS classes -->
<!-- - Use CSS custom properties (variables) for theming -->
<!-- - Implement consistent spacing, typography, and color systems -->
<!-- - Ensure accessibility with proper ARIA attributes and semantic HTML -->

- Implement responsive design with mobile-first approach
- Use colors from `src/constants/colors.ts` for consistency
- Use shared styles from `src/styles/sharedStyles.ts` for common patterns
- Project uses Uniwind, so use ComponentName.tsx for the component and styles. Tailwind classes should be used directly in the component file. Inject variables if possible. Else use inline styles, avoid creating separate styles files unless necessary for complex styles or theming.
- Prioritize Uniwind `className` styling whenever possible. Use React Native `StyleSheet`/inline style as a backup only when Uniwind cannot express the requirement cleanly (runtime-calculated values, platform-only edge cases, or third-party API style objects).

### Performance Optimization (if applicable and not handled by React compiler)

- Use `React.memo` for component memoization when appropriate
- Implement code splitting with `React.lazy` and `Suspense`
- Optimize bundle size with tree shaking and dynamic imports
- Consider `useMemo` and `useCallback` judiciously for performance optimization, like preventing unnecessary re-renders when needed
<!-- - Implement virtual scrolling for large lists -->
- Use FlashList for performant list rendering in React Native
- Profile components with React DevTools to identify performance bottlenecks

### Data Fetching

<!-- - Use modern data fetching libraries (React Query, SWR, Apollo Client) -->

- Use React Query
- Implement proper loading, error, and success states
- Handle race conditions and request cancellation
- Use optimistic updates for better user experience
- Implement proper caching strategies
- Handle offline scenarios and network errors gracefully
- Use tryCatch helper from `src/utils/helpers.ts` for cleaner async code and error handling

### Error Handling

- Implement Error Boundaries for component-level error handling
- Use proper error states in data fetching
- Implement fallback UI for error scenarios
- Log errors appropriately for debugging
- Handle async errors in effects and event handlers
- Provide meaningful error messages to users

### Forms and Validation

- Use controlled components for form inputs
- Implement proper form validation with libraries like Formik, React Hook Form (if non is used, ask about form handling patterns)
- Handle form submission and error states appropriately
- Implement accessibility features for forms (labels, ARIA attributes)
- Use debounced validation for better user experience
- Handle file uploads and complex form scenarios

### Routing & navigation

- Routes are file-based under `src/app`. Routes with parentheses (e.g. `(tabs)`) group navigation — follow `expo-router` conventions. The root layout is [src/app/\_layout.tsx](src/app/_layout.tsx#L1-L200).
- Handle route parameters and query strings properly
- Preserve file-based routing: when adding a screen, create files under `src/app/` rather than editing central route registries.
  <!-- - Implement nested routes and route protection -->
  <!-- - Implement lazy loading for route-based code splitting -->
  <!-- - Use proper navigation patterns and back button handling -->
  <!-- - Implement breadcrumbs and navigation state management -->

### Testing

- Add unit tests for components and hooks in the same folder with `.test.tsx` or `.test.ts` suffix (example: `ComponentName.test.tsx`).
- Write unit tests for components using Jest and React Testing Library
- Test component behavior, not implementation details
- Use Jest for test runner and assertion library
- Implement integration tests for complex component interactions
- Mock external dependencies and API calls appropriately
- Test accessibility features and keyboard navigation

### Security

- Sanitize user inputs to prevent XSS attacks
- Validate and escape data before rendering
- Use HTTPS for all external API calls
- Implement proper authentication and authorization patterns
- Avoid storing sensitive data in localStorage or sessionStorage
<!-- - Use Content Security Policy (CSP) headers -->

### Accessibility

- Ensure keyboard navigation works for all interactive elements
- Provide alt text for images and descriptive text for icons
- Implement proper color contrast ratios if project uses custom colors

## Implementation Process

1. Plan component architecture and data flow
2. Set up project structure with proper folder organization
3. Define TypeScript interfaces and types
4. Implement core components with proper styling
5. Add state management and data fetching logic
6. Implement routing and navigation
7. Add form handling and validation
8. Implement error handling and loading states
9. Add testing coverage for components and functionality
10. Optimize performance and bundle size
11. Ensure accessibility compliance
12. Add documentation and code comments

## Additional Guidelines

- Follow React's naming conventions (PascalCase for components, camelCase for functions)
- Use meaningful commit messages and maintain clean git history
- Implement proper code splitting and lazy loading strategies
- Document complex components and custom hooks with JSDoc
- Use ESLint and Prettier for consistent code formatting. Scripts exist in `package.json` (`lint`, `lint:fix`, `prettier`, `prettier:fix`, `format:fix`). The codebase uses ESLint + Prettier; run `bun run format:fix` or `npm run format:fix` before committing.
- Keep dependencies up to date and audit for security vulnerabilities
- Implement proper environment configuration for different deployment stages
- Native integration: some packages require native rebuilds (e.g., `react-native-reanimated`, `react-native-svg`) — for native changes use `expo prebuild` / rebuild flows.
- Commits: repo has Husky configured — ensure pre-commit linting still passes. If GPG signing issues occur, local repo config may disable signing.
<!-- - Use React Developer Tools for debugging and performance analysis -->

## Common Patterns

- Higher-Order Components (HOCs) for cross-cutting concerns
- Render props pattern for component composition
- Compound components for related functionality
- Provider pattern for context-based state sharing
- Container/Presentational component separation
- Custom hooks for reusable logic extraction

### Build / dev / tools

- Install: repo prefers Bun. Run `bun install` (creates `bun.lock`), or fall back to `npm install` if needed.
- Dependency changes: run `bun install` locally and commit `bun.lock`. Do not reintroduce `package-lock.json` or `yarn.lock` without team agreement.
- Start dev server: use the `package.json` script: `expo start` (or `bun run start`). Metro / Expo expect a Node runtime — running `expo start` with Node is the most reliable option.
- Metro config: SVGs are handled via `react-native-svg-transformer` and `metro.config.js` is already configured.

### Important files to inspect for context

- App entry & layout: [src/app/\_layout.tsx](src/app/_layout.tsx#L1-L200)
- Routes: `src/app/*` (file-based routing)
- API constants: [src/constants/api.ts](src/constants/api.ts#L1-L20)
- Hooks: `src/hooks/*` (`usePokemonList.ts`, `usePokemonDetails.ts`, etc.)
- Stores / contexts: `src/store/*` (SavedContext, ToastContext)
- Metro/Babel: `metro.config.js`, `babel.config.js` (SVG transform, Expo preset)
- TypeScript config: `tsconfig.json` (paths and `expo/tsconfig.base` extend)
