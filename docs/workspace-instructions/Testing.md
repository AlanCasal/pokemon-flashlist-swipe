## Testing

- Add tests close to source files (`*.test.ts` / `*.test.tsx`) and test behavior over implementation.
- Testing core principles:
  - Most important: keep tests behavior-first focused while mocking non-essential dependencies.
  - Mock all imported components in component tests to keep units isolated and outputs consistent.
  - Prefer string representations for mocked components when the mock does not need custom behavior.
  - For any future Redux-backed tests, use a consistent `mockUseAppSelector` pattern for selector access.
  - Keep all `jest.mock()` declarations at the top of the file before any `describe` block.
- Run tests with `bun run test` (watchman is disabled in the script); prefer JSX content assertions with `@testing-library/react-native` for component UI behavior.
- Run coverage with `bun run test:coverage`; treat `coverage/` as a local generated artifact and use `coverage/lcov-report/index.html` for visual inspection.
