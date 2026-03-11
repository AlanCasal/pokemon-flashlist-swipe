# Pokédex App

> A high-performance, mobile-first Pokedex built with Expo + React Native, designed to showcase polished UI/UX, thoughtful architecture, and multilingual support (`en`, `es`, `de`, `ja`).

> [!WARNING]
> This project is currently **WIP (Work in Progress)**. More features and refinements are actively being added.

<p align="center">
  <img src="./assets/demo/demo-list.gif" width=30%>
</p>

[![Status: WIP](https://img.shields.io/badge/status-WIP-orange?style=for-the-badge)](https://github.com/AlanCasal/pokemon-flashlist-swipe)
[![Last Commit](https://img.shields.io/github/last-commit/AlanCasal/pokemon-flashlist-swipe?style=for-the-badge&logo=github)](https://github.com/AlanCasal/pokemon-flashlist-swipe/commits/main)

### Core Stack

[![TypeScript](https://img.shields.io/badge/typescript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/expo-54-000020?style=for-the-badge&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/react_native-0.81-20232A?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/react-19-149ECA?style=for-the-badge&logo=react)](https://react.dev/)
[![Bun](https://img.shields.io/badge/bun-1.3-000000?style=for-the-badge&logo=bun)](https://bun.sh/)

### Key Libraries

[![Expo Router](https://img.shields.io/badge/expo_router-6.0-111111?style=for-the-badge)](https://docs.expo.dev/router/introduction/)
[![FlashList](https://img.shields.io/badge/FlashList-2.0.2-00A86B?style=for-the-badge)](https://shopify.github.io/flash-list/)
[![React Query](https://img.shields.io/badge/React_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.8-4E342E?style=for-the-badge)](https://zustand.docs.pmnd.rs/)
[![Reanimated](https://img.shields.io/badge/Reanimated-4.1.1-6C5CE7?style=for-the-badge)](https://docs.swmansion.com/react-native-reanimated/)
[![Bottom Sheet](https://img.shields.io/badge/Bottom_Sheet-5.2.8-0EA5E9?style=for-the-badge)](https://gorhom.dev/react-native-bottom-sheet/)
[![MMKV](https://img.shields.io/badge/MMKV-4.1.2-16A34A?style=for-the-badge)](https://github.com/mrousavy/react-native-mmkv)

### AI Workflow

[![Built with Codex App](https://img.shields.io/badge/Built%20with-Codex%20App-111111?style=for-the-badge)](https://openai.com/)
[![AI Pairing: GPT-5.3-Codex](https://img.shields.io/badge/AI-GPT--5.3--Codex-0B5FFF?style=for-the-badge)](https://openai.com/)

## Project Health

[![Tests In Progress](https://img.shields.io/badge/tests-in%20progress-yellow?style=for-the-badge)](#project-health)
[![Coverage Not Configured](https://img.shields.io/badge/coverage-not%20configured-lightgrey?style=for-the-badge)](#project-health)

<!--
Future dynamic test badge template (GitHub Actions):
[![Tests](https://img.shields.io/github/actions/workflow/status/AlanCasal/pokemon-flashlist-swipe/ci.yml?branch=main&label=tests&style=for-the-badge)](https://github.com/AlanCasal/pokemon-flashlist-swipe/actions)

Future dynamic coverage badge templates:
[![Codecov](https://img.shields.io/codecov/c/github/AlanCasal/pokemon-flashlist-swipe?style=for-the-badge)](https://codecov.io/gh/AlanCasal/pokemon-flashlist-swipe)
[![Coveralls](https://img.shields.io/coverallsCoverage/github/AlanCasal/pokemon-flashlist-swipe?style=for-the-badge)](https://coveralls.io/github/AlanCasal/pokemon-flashlist-swipe)
-->

## Why This Project Stands Out

- ⚡ **Performance-first list rendering** with FlashList and smooth scrolling behavior.
- 🎨 **Strong visual direction** inspired by a dedicated Figma UI guide.
- 🧠 **Thoughtful state + data flow** using React Query, Zustand, and MMKV persistence.
- 🧩 **Scalable architecture** with feature-based structure, reusable components, and hooks.
- 🤖 **AI-accelerated development** using Codex App + GPT-5.3-Codex as coding copilot.

## Current Features

- ✨ Animated home experience with marquee Pokémon sprites.
- 📱 Tab-based navigation (Pokedex + Saved) powered by Expo Router.
- 🔎 Search + filter + generation + sort workflows in the Pokedex screen.
- 📊 Pokémon detail screen with **About**, **Stats**, and **Evolution** tabs.
- ⭐ Save/unsave Pokémon with local persistence.
- 🌍 Internationalization with in-app language switching: English (`en`), Español (`es`), Deutsch (`de`), 日本語 (`ja`).
- 🎬 Rich motion via Reanimated and polished bottom-sheet interactions.

## WIP: In Progress / Next

- 🚧 Ongoing feature additions and UX polish.
- 🧪 Continued test coverage expansion.
- 🧬 Evolution-chain data quality fixes.
- 🪟 UI refinements for tab/bar behavior across iOS and Android.
- 🌍 Additional locale expansion beyond current `en` / `es` / `de` / `ja` support.

## Figma UI Guide

Design source used during implementation and iteration:

- [Figma UI Guide](https://www.figma.com/design/dmZL7AGoSOpu8Lh2RXAXi2/Pok%C3%A9dex--Fox-%F0%9F%A6%8A-?node-id=18241-2789&t=zehKinBHAs9D14pk-1)

## Demo Gallery (Coming Soon)

GIF recordings of the app will be added here.

- 🎥 `Home flow` (coming soon)
- 🎥 `Pokedex search/filter flow` (coming soon)
- 🎥 `Pokemon details + evolution flow` (coming soon)

## Tech & AI Stack

### Languages & Runtime

- TypeScript
- JavaScript
- React 19
- React Native 0.81
- Expo 54
- Bun

### Core Packages

- `expo-router`
- `@shopify/flash-list`
- `@tanstack/react-query`
- `zustand`
- `react-native-reanimated`
- `@gorhom/bottom-sheet`
- `react-native-mmkv`
- `expo-image`
- `expo-linear-gradient`
- `i18next`
- `react-i18next`
- `expo-localization`

### Internationalization

- Device language is resolved with `expo-localization` and mapped to supported app locales.
- Translation resources are managed with `i18next` + `react-i18next`.
- The language preference is persisted locally, with English (`en`) as fallback.

### AI Tools Used

- Codex App
- GPT-5.3-Codex

## Quick Start

```bash
bun install
bun run start
```

Run on device/simulator:

```bash
bun run ios
bun run android
```

Format + lint:

```bash
bun run format:fix
```

## Contact

- LinkedIn: [linkedin.com/in/alancasal](https://www.linkedin.com/in/alancasal/)
- Email: [alan.casal.dev@gmail.com](mailto:alan.casal.dev@gmail.com)
