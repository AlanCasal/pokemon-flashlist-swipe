# Design — upgrade-dependencies

## Context

Expo 55 / RN 0.83 / React 19.2 / TS 5.9 app, Bun as package manager, committed `android/`+`ios/` directories regenerated via `expo prebuild`. Legacy `.eslintrc.js` built on `eslint-config-airbnb-typescript` (unmaintained, pins @typescript-eslint 7, blocks ESLint ≥9). Expo SDK 56 (May 2026) is out: RN 0.85.3, React 19.2.3, Hermes v1 default. Several npm-latest packages are *ahead* of what SDK 56 supports.

Exploration findings that constrain the design:

| Package | npm latest | SDK 56 pin / hold |
|---|---|---|
| react-native | 0.86.0 | 0.85.3 |
| react-native-gesture-handler | 3.0.1 | ~2.31.1 |
| react-native-reanimated | 4.4.1 | 4.3.1 |
| react-native-worklets | 0.9.2 | 0.8.3 |
| @shopify/flash-list | 2.3.2 | 2.0.2 |
| typescript | 6.0.3 | 5.9.3 (hold) |
| @types/jest | 30.0.0 | 29.x (jest-expo 56 = Jest 29) |

## Goals / Non-Goals

**Goals:**
- Every dependency at its latest **stable compatible** version; app builds, type-checks, lints, and tests green.
- ESLint stack modernized to ESLint 10 flat config with all existing custom rules preserved.
- Breaking changes fixed in code, driven by toolchain output (tsc/lint/jest), not speculation.

**Non-Goals:**
- React Native 0.86 / gesture-handler 3 / TypeScript 6 (beyond SDK 56 support).
- New features, refactors, or rule-set changes beyond what the upgrade forces.
- Replicating airbnb-typescript's stylistic rules one-for-one (prettier + @stylistic + eslint-config-expo cover the intent).

## Decisions

1. **`expo install --fix` is the version authority for the native layer** — not `bun outdated`. Rationale: SDK pins are what Expo tests and what keeps `expo-doctor` green. Alternative (npm-latest everywhere) rejected: RN 0.86/gesture-handler 3 are unsupported by SDK 56.
2. **Latest-stable policy for everything else**: take majors (i18next 26, react-i18next 17, RNTL 14, lint-staged 17, concurrently 10) but hold transitional/incompatible releases (TS 6.0, @types/jest 30).
3. **ESLint: rebuild on `eslint-config-expo/flat` + typescript-eslint 8, drop airbnb-typescript.** Alternative (stay on ESLint 8) rejected by the developer — it just defers the dead-end. Custom rules from `.eslintrc.js` are ported verbatim; `.eslintrc.js`/`.eslintignore` deleted; `--ext` flags dropped from scripts.
4. **Drop `@testing-library/jest-native`**, use RNTL 14 built-in matchers. It's deprecated and RNTL ≥12.4 ships the matchers natively.
5. **Order: SDK upgrade → other deps → ESLint migration → code fixes.** Each phase verified before the next so failures are attributable. Lint/tsc baselines captured first to detect silent rule-coverage regressions.
6. **Prebuild regenerates committed natives** (`expo prebuild --clean --platform all`) rather than hand-editing gradle/podfiles.

## Risks / Trade-offs

- [Hermes v1 default may change runtime behavior] → boot the app and exercise MMKV-backed stores (`src/store/`) after upgrade.
- [Dropping airbnb rules may silently *unflag* issues] → diff `bun run lint` output against the pre-upgrade baseline.
- [RNTL 14 introduces `test-renderer ^1.0.0` peer and matcher changes] → run full jest suite; fix per RNTL 14 migration guide.
- [Flat-config support varies per plugin (eslint-plugin-react-native v5, eslint-plugin-jest 29, @stylistic 5, eslint-plugin-testing-library 7)] → verify at install time; use `FlatCompat` from `@eslint/eslintrc` only as a last resort.
- [Branch carries unrelated WIP] → do the upgrade on a dedicated branch off `master`.

## Migration Plan

Implementation phases are in `tasks.md`. Rollback: the change is confined to `package.json`/`bun.lock`, lint config files, regenerated natives, and toolchain-driven code fixes — revert the branch to roll back. No data or API migrations.

## Open Questions

- Whether `eslint-plugin-react-native` v5 `plugin:react-native/all` equivalents exist in flat form, or rules must be enabled individually (resolved at implementation time).
