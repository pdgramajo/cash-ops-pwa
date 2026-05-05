# TODO: PWA Configuration and Build

## Tasks

### 20.1 Configure PWA
- [ ] Create manifest.json with:
  - name: "Cash Operations System"
  - short_name: "CashOps"
  - theme_color
  - background_color
  - display: standalone
  - icons (various sizes)
- [ ] Create service worker (sw.ts)
- [ ] Register service worker in main.tsx
- [ ] Add meta tags for mobile:
  - viewport
  - apple-mobile-web-app-capable
  - apple-mobile-web-app-status-bar-style

### 20.2 Utility Tests
- [ ] Test formatters.formatCurrency() - es-AR locale
- [ ] Test formatters.formatCurrency() - en-US locale
- [ ] Test formatters.formatDate() - DD/MM/AAAA
- [ ] Test formatters.formatDateTime()
- [ ] Test validators.validateAmount() - valid
- [ ] Test validators.validateAmount() - invalid
- [ ] Test calculations.calculateCashTotal() - sales
- [ ] Test calculations.calculateTransferTotal() - sales
- [ ] Test calculations.calculateTotalSales()
- [ ] Test calculations.calculateEstimatedCash()

### 20.3 Build and Verify
- [ ] Run production build
- [ ] Verify bundle size < 500KB
- [ ] Test lazy loading works
- [ ] Test PWA installable
- [ ] Verify coverage threshold: 80%

### 20.4 Browser Testing
- [ ] Test in Chrome (90+)
- [ ] Test in Firefox (88+)
- [ ] Test in Safari (14+)
- [ ] Test in Edge (90+)

## Coverage Target: 80%

## Dependencies
- TODO-05-branches (complete)
- TODO-06-sessions (complete)
- TODO-07-transactions (complete)
- TODO-08-inventory (complete)
- TODO-09-reports (complete)
- TODO-10-receipts (complete)
- TODO-11-import-export (complete)
- TODO-12-testing-environment (complete)
- TODO-13-branches-testing (complete)
- TODO-14-sessions-testing (complete)
- TODO-15-transactions-testing (complete)
- TODO-16-inventory-testing (complete)
- TODO-17-reports-testing (complete)
- TODO-18-receipts-testing (complete)
- TODO-19-import-export-testing (complete)
- TODO-21-docker (complete)

## Status: PENDING