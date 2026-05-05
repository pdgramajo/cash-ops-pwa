# TODO: Project Setup and Dependencies

## Tasks

### 1.1 Initialize Vite project with React and TypeScript
- [ ] Run `npm create vite@latest . -- --template react-ts`
- [ ] Verify project structure created

### 1.2 Configure Tailwind CSS v4 with Vite plugin
- [ ] Install Tailwind CSS v4 and @tailwindcss/vite plugin
- [ ] Configure vite.config.ts with Tailwind plugin
- [ ] Create main.css with @import "tailwindcss"

### 1.3 Set up project structure
- [ ] Create folders: src/components, src/hooks, src/repositories, src/services, src/pages, src/types, src/utils, src/db
- [ ] Clean up default boilerplate files

### 1.4 Configure base path in vite.config
- [ ] Set base: '/Cash-operations-app/'
- [ ] Verify routing works with base path

### 1.5 Install core dependencies
- [ ] Install react-router-dom
- [ ] Install dexie (IndexedDB wrapper)
- [ ] Install uuid for generating UUIDs
- [ ] Install jspdf for PDF generation
- [ ] Install @types/uuid
- [ ] Install i18next and react-i18next
- [ ] Install testing dependencies:
  - vitest (test runner)
  - @testing-library/react (component testing)
  - @testing-library/jest-dom (custom matchers)
  - jsdom (DOM virtual)
  - @vitest/coverage-v8 (code coverage)
  - fake-indexeddb (mock IndexedDB for tests)

### 1.6 Configure Linting and Formatting
- [ ] Install ESLint packages:
  - eslint
  - @eslint/js
  - typescript-eslint
  - eslint-plugin-react
  - eslint-plugin-react-hooks
- [ ] Install Prettier:
  - prettier
  - eslint-config-prettier
- [ ] Create .eslintrc.cjs configuration
- [ ] Create .prettierrc configuration
- [ ] Configure VSCode settings for auto-save

### 1.7 Configure Git Hooks
- [ ] Install Husky:
  - husky
  - lint-staged
- [ ] Initialize Husky: npx husky init
- [ ] Create pre-commit hook (lint + tests)
- [ ] Create commit-msg hook (conventional commits)
- [ ] Configure package.json scripts

### 1.8 Configure Testing Environment
- [ ] Create vitest.config.ts
- [ ] Create test/setup.ts
- [ ] Configure coverage threshold to 80%
- [ ] Add npm scripts: test, test:run, test:coverage

## Status: IN_PROGRESS