# TODO: Routing and UI Foundation

## Tasks

### 4.1 Setup React Router with base path
- [ ] Configure BrowserRouter with basename: '/Cash-operations-app/'
- [ ] Create routes:
  - / → SessionsPage
  - /session/:sessionId → SessionPage
  - /reports → ReportsPage
  - /receipts → ReceiptsPage
- [ ] Configure lazy loading for pages

### 4.2 Setup i18n (Internationalization)
- [ ] Install i18next and react-i18next
- [ ] Configure i18n with Spanish (es-AR) as default locale
- [ ] Create translation files:
  - src/i18n/locales/es.json (Spanish translations)
  - src/i18n/locales/en.json (English translations - optional)
- [ ] Setup language detection from browser
- [ ] Create useTranslation hook wrapper

### 4.3 Create Theme Provider
- [ ] Create ThemeProvider component
- [ ] Implement light/dark mode toggle
- [ ] Persist theme preference in localStorage
- [ ] Apply theme class to root element

### 4.4 Setup Navigation Layout
- [ ] Create main AppLayout component
- [ ] Create Header with navigation buttons
- [ ] Implement responsive design

### 4.5 Configure shadcn/ui components
- [ ] Install @required/shadcn/ui dependencies
- [ ] Setup components.json
- [ ] Configure tailwind.config for shadcn
- [ ] Install core components:
  - Card
  - Button
  - Input
  - Select
  - Dialog
  - AlertDialog
  - Tabs
  - ScrollArea
  - Label

### 4.6 Create Utility Functions
- [ ] Create formatters.ts (currency, date, datetime)
- [ ] Create validators.ts
- [ ] Create calculations.ts (session totals)
- [ ] Use i18n for number/date formatting

## Testing
- Tests for formatters, validators, and calculations are in TODO-20-pwa-build.md

## Dependencies
- TODO-01-project-setup (complete)
- TODO-02-database (complete)
- TODO-03-repositories (complete)

## Status: PENDING