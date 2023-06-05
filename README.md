<!-- @format -->

# Practical Task

## Start the development server

```bash
   yarn

   or

   yarn install
```

- To run in android

  ```bash
    yarn android
  ```

- To run in iOS

  ```bash
  npx pod-install

  yarn ios
  ```

  press `a` to run in android `i` to run in iOS

## Configuration

The Project has a few configuration files that can be customize to fit the needs:

- **.husky**: Husky improves commits and more.
- **.prettierrc**: Configuration for Prettier code formatting.
- **.eslintrc**: Configuration for ESLint code linting.
- **tsconfig.json**: TypeScript compiler configuration.

# Source-controls

Used husky for better commit and conventional commit lint

- added pre-commit rules of linting and typescript check
- used <https://www.npmjs.com/package/@commitlint/config-conventional> package for better conventional commit message <https://github.com/conventional-changelog/commitlint>
- branch prefixes as feat/fix/chore/hotfix
- chore branches for updating version, test etc.
- PR go from your_local_branch -> dev.

## Code linting

This React Native Project utilizes ESLint, a popular linting tool, to enforce consistent and high-quality code across project. ESLint helps identify and fix common code issues, ensuring codebase adheres to best practices and coding standards.

The ESLint configuration in this project includes the following features and plugins:

- `@commitlint/cli`: Enforces conventional commit messages.
- `@commitlint/config-conventional`: Provides commit message linting rules following conventional commit format.
- `eslint-plugin-import`: Provides rules for linting ES6 import/export syntax.
- `eslint-plugin-import-order-autofix`: Sorts import statements automatically.
- `eslint-plugin-no-inline-styles`: Detects and discourages the use of inline styles in React Native.
- `eslint-plugin-prettier`: Integrates Prettier code formatting rules into ESLint.
- `eslint-plugin-react-hooks`: Enforces rules for React Hooks.
- `eslint-plugin-react-native`: Provides rules specific to React Native development.
- `eslint-plugin-sort-keys-fix`: Sorts object keys in alphabetical order.

configuration of this lint is added in `.eslintrc.js` file.

## Introduction

This Project has Login screen & Home screen. Home screen has 2 tabs which contains API calling & favourite-unfavourite feature, & redux.

## Tech Stack

| Library          | Category                 | Version |
| ---------------- | ------------------------ | ------- |
| React Native     | Mobile Framework         | v0.71   |
| React            | UI Framework             | v18     |
| TypeScript       | Language                 | v4      |
| React Navigation | Navigation               | v6      |
| Redux Toolkit    | State Managememt toolkit | v1      |
| MMKV             | Local Storage            | v2      |

## Folder Structure

The project structure follows a modular approach to organize codebase in a scalable manner. Here's an overview of the key folders:

```
├── blueprints
│ ├── Text
│ ├── Button
│ └── TextInput
│ └── Indicator
│ └── Image
│ └── Toast
│ └── ...
```

- **blueprints**: Contains the app elements that Customize as per app development required.

  - **Text**: Text element(typography) for app consist presets of all font family and font-size that we have to use in app.
    For Example:

    ```js
    import { Text } from '@app/blueprints';

    <Text preset="h1">{contents('newsList', 'breakingNews')}</Text>;
    ```

```
├── src
│ ├── assets
│ ├── components
│ ├── constants
│ ├── context
│ ├── i18n
│ ├── navigation
│ ├── screens
│ ├── services
│ ├── store
│ ├── utils
│ └── ...
```

- **src**: Contains the main source code of application.

  - **assets**: Stores static assets such as images, fonts, and icons.
  - **components**: Reusable UI components.
  - **constants**: App constants.
  - **i18n**: Localization files for i18next.
  - **navigation**: Navigation setup and configuration.
  - **screens**: Individual screens/pages of application.
  - **utils**: Utility functions and helpers.
