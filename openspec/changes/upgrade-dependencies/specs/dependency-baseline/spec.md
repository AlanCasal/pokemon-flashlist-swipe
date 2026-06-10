# dependency-baseline

## ADDED Requirements

### Requirement: Dependencies track latest stable versions compatible with the Expo SDK
The project SHALL keep all dependencies at their latest stable versions that are compatible with the installed Expo SDK (56). Native modules and `expo-*` packages MUST use the versions resolved by `expo install --fix`, even when newer versions exist on npm.

#### Scenario: Expo-managed packages align with SDK pins
- **WHEN** `bunx expo install --fix` and `bunx expo-doctor` are run after the upgrade
- **THEN** no version mismatches are reported and expo-doctor passes

#### Scenario: Non-Expo packages are at latest stable
- **WHEN** `bun outdated` is run after the upgrade
- **THEN** the only packages not at npm-latest are the documented holds (typescript 5.9.x, @types/jest 29.x, and SDK-56-pinned natives such as react-native, gesture-handler, reanimated, worklets, flash-list)

### Requirement: The app remains fully functional after the upgrade
The upgraded dependency set MUST NOT break the build, type-check, test suite, or runtime boot.

#### Scenario: Toolchain is green
- **WHEN** `bunx tsc --noEmit`, `bun run lint`, and `bun run test` are run
- **THEN** all complete with zero errors and a green test suite

#### Scenario: Native projects regenerate
- **WHEN** `bun run prebuild:all` is run
- **THEN** prebuild completes successfully for both platforms

#### Scenario: App boots on the new SDK
- **WHEN** the app is started (`expo start` / `bun run ios`)
- **THEN** the bundle builds without errors and MMKV-persisted stores (language, saved, toast) load correctly under Hermes v1

### Requirement: Deprecated test matcher library is removed
The project SHALL NOT depend on `@testing-library/jest-native`; built-in matchers from `@testing-library/react-native` ≥14 MUST be used instead.

#### Scenario: jest-native is gone
- **WHEN** `package.json` and `jest.setup.ts` are inspected after the upgrade
- **THEN** `@testing-library/jest-native` does not appear, and all tests pass using RNTL built-in matchers
