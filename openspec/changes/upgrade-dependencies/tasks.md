# Tasks — upgrade-dependencies

## 1. Baseline & branch

- [ ] 1.1 Create a dedicated branch off `master` (current branch has unrelated WIP)
- [ ] 1.2 Capture baselines: `bun run lint`, `bunx tsc --noEmit`, `bun run test` outputs saved for later diffing; confirm suite is green pre-upgrade

## 2. Expo SDK 56 upgrade

- [ ] 2.1 `bunx expo install expo@^56.0.0`, then `bunx expo install --fix` to align all expo-* and native modules to SDK 56 pins (RN 0.85.3, React 19.2.3, gesture-handler ~2.31.1, reanimated 4.3.1, worklets 0.8.3, screens 4.25.2, safe-area ~5.7.0, svg 15.15.4, webview 13.16.1, flash-list 2.0.2, expo-router 56.x, jest-expo ~56.0.4)
- [ ] 2.2 Align react-test-renderer to 19.2.3 (exact match with react) and @types/react to ~19.2.17; bump react-native-nitro-modules to latest 0.35.x
- [ ] 2.3 Review SDK 56 changelog breaking changes (Hermes v1 default) and apply any required app.json/config updates
- [ ] 2.4 Regenerate natives with `bun run prebuild:all`; run `bunx expo-doctor` until it passes

## 3. Independent JS dependencies

- [ ] 3.1 Upgrade i18next ^26 + react-i18next ^17 together; fix any type/API changes in `src/i18n/`
- [ ] 3.2 Upgrade @testing-library/react-native to ^14; remove @testing-library/jest-native; update `jest.setup.ts` and any matcher imports to RNTL built-ins
- [ ] 3.3 Upgrade remaining minors/majors: @tanstack/react-query, zustand, moti ^0.30, @expo-google-fonts/finger-paint ^0.4, react-native-svg-transformer, prettier, lint-staged ^17 (verify config format), concurrently ^10, eslint-plugin-simple-import-sort ^13
- [ ] 3.4 Confirm holds remain: typescript 5.9.3, @types/jest 29.x, flash-list 2.0.2

## 4. ESLint flat-config migration

- [ ] 4.1 Upgrade eslint ^10, @typescript-eslint/* ^8.61, eslint-config-expo ~56.0.4; remove eslint-config-airbnb-typescript
- [ ] 4.2 Write `eslint.config.js` on `eslint-config-expo/flat` with typed linting, porting every custom rule and ignore pattern from `.eslintrc.js`/`.eslintignore` (no-console, jsx-no-literals, simple-import-sort, no-restricted-imports trio, import/no-extraneous-dependencies allowlist, @typescript-eslint disables, react-native rules, jest, prettier last)
- [ ] 4.3 Verify flat-config compatibility of all plugins (react-native v5, jest 29, @stylistic 5, testing-library 7); resolve with FlatCompat only if unavoidable
- [ ] 4.4 Delete `.eslintrc.js` + `.eslintignore`; update `lint`/`lint:fix` scripts (drop `--ext`); verify husky/lint-staged pre-commit still lints staged files
- [ ] 4.5 Diff `bun run lint` output against baseline; document any intentional rule-coverage changes

## 5. Fix breakage & verify

- [ ] 5.1 Run `bunx tsc --noEmit`, `bun run lint`, `bun run test`; fix all errors/warnings (expected hot spots: RNTL 14 in tests, expo-router 56 types, i18next 26 types)
- [ ] 5.2 Full verification: clean `bun install`, expo-doctor pass, prebuild succeeds, `bun outdated` shows only documented holds
- [ ] 5.3 Boot check: `expo start` bundles (ideally `bun run ios`); exercise MMKV stores under Hermes v1
- [ ] 5.4 Update `docs/workspace-instructions/Tooling.md` (and CLAUDE.md if commands changed) for the flat-config setup
