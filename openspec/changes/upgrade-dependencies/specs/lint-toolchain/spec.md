# lint-toolchain

## ADDED Requirements

### Requirement: ESLint runs on version 10 with flat config
The project SHALL lint with ESLint 10 using a flat `eslint.config.js` built on `eslint-config-expo` 56 and typescript-eslint 8. The legacy `.eslintrc.js`, `.eslintignore`, and `eslint-config-airbnb-typescript` MUST be removed.

#### Scenario: Flat config is the only config
- **WHEN** the repo is inspected after the migration
- **THEN** `eslint.config.js` exists, `.eslintrc.js` and `.eslintignore` do not, and `bun run lint` succeeds without `--ext` flags

#### Scenario: Typed linting still works
- **WHEN** a rule requiring type information (e.g. `@typescript-eslint/no-misused-promises` family) is evaluated
- **THEN** ESLint resolves types via the project's tsconfig without parser errors

### Requirement: Existing custom lint rules are preserved
The flat config MUST preserve the project's enforced conventions: `no-console: error`, `react/jsx-no-literals`, `simple-import-sort/imports` + `exports`, `react-hooks/exhaustive-deps`, `react-native/no-raw-text`, the three `no-restricted-imports` entries (async-storage, markdown-display `styles`, safe-area-context `SafeAreaView`), the `import/no-extraneous-dependencies` dev-file allowlist, and the existing `@typescript-eslint/*` disables. Ignore patterns (including `src/components/clerk/**`, `android/`, `ios/`) MUST carry over.

#### Scenario: Rule violations still flagged
- **WHEN** code containing `console.log`, a raw JSX string literal, unsorted imports, or `import AsyncStorage from '@react-native-async-storage/async-storage'` is linted
- **THEN** ESLint reports an error for each

#### Scenario: No rule-coverage regression
- **WHEN** `bun run lint` output is compared with the pre-upgrade baseline on the same code
- **THEN** no previously-reported error class disappears without an intentional, documented reason

### Requirement: Lint tooling integrates with the existing workflow
Husky + lint-staged MUST continue to lint staged files, and workspace docs MUST describe the flat-config setup.

#### Scenario: Pre-commit hook still lints
- **WHEN** a `.ts`/`.tsx` file is staged and committed
- **THEN** lint-staged runs ESLint against it under the flat config

#### Scenario: Docs updated
- **WHEN** `docs/workspace-instructions/Tooling.md` is read after the migration
- **THEN** it documents the flat config and any changed commands
