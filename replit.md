# PocketPal AI

## Overview
PocketPal AI is a React Native mobile application that enables users to run Small Language Models (SLMs) locally on iOS and Android devices. All inference runs on-device — no internet connection required for AI interactions.

## Tech Stack
- **Framework**: React Native 0.82.1 with TypeScript 5.0.4
- **Package Manager**: Yarn 1.22.22 (node-modules linker)
- **Node.js**: v22 (required: >=22)
- **AI/Inference**: `llama.rn` — bindings for llama.cpp to run GGUF models
- **State Management**: MobX 6 with mobx-persist-store
- **Database**: WatermelonDB 0.28 (reactive local DB for chats, messages, models)
- **UI**: React Native Paper (Material Design), react-native-vector-icons
- **Navigation**: React Navigation v7 (Stack + Drawer)
- **Dev Server**: Metro Bundler (React Native's bundler)

## Project Structure
- `src/` — Main source code
  - `api/` — Hugging Face and OpenAI-compatible endpoint integrations
  - `assets/` — Images, fonts, SVG icons
  - `components/` — Reusable UI components
  - `database/` — WatermelonDB schema, migrations, models
  - `hooks/` — Custom React hooks
  - `locales/` — i18n translation files (JSON)
  - `repositories/` — Data access layer
  - `screens/` — App screens (Chat, Models, Pals, Benchmark)
  - `services/` — Business logic (downloads, HuggingFace, PalsHub)
  - `store/` — MobX stores
- `android/` — Android native code + Gradle build
- `ios/` — iOS native code + CocoaPods build
- `e2e/` — WebdriverIO end-to-end tests
- `__tests__/` — Jest unit tests

## Development Workflow
- Metro bundler runs as the dev server on port 8080
- Workflow: `yarn start --port 8080`
- Native builds require Android Studio (Android) or Xcode (iOS) — not available in this environment

## Key Notes
- This is a **mobile-only** app — no web frontend. The Metro bundler provides the JS bundle to native device/emulator connections.
- Native compilation (Android/iOS) is not possible in the Replit environment without Android Studio or Xcode.
- The Metro server can be connected to by physical devices or emulators for development.
- Dependencies are installed with `--ignore-scripts` to skip native compilation steps.
