# TODO: Reports Module

## Tasks

### 9.1 Create Reports Service
- [ ] Create reportService.ts
- [ ] Implement generateSessionReport(sessionId): Promise<PDFDocument>
- [ ] Implement generateDailyReport(date, branchId?): Promise<PDFDocument>
- [ ] Implement downloadPDF(doc, filename): void

### 9.2 Create ReportsPage Component
- [ ] Create ReportsPage layout
- [ ] Implement tabs: Por Sesión, Diario

### 9.3 Implement Report Generation
- [ ] RF-REP-001: Generate report by session
- [ ] RF-REP-002: Generate daily report (select date and branch)
- [ ] RF-REP-003: Auto-download PDF with descriptive filename

### 9.4 PDF Content Structure
- [ ] Session report includes:
  - Session data
  - Cash sales summary
  - Transfer sales summary
  - Expenses summary
  - Withdrawals summary
  - Closing balance
  - Inventory movements
- [ ] Daily report includes:
  - Session list for the day
  - Transactions per session
  - Consolidated totals
  - Inventory movements

## Acceptance Criteria
- [ ] CA-REP-001: Session PDF contains all relevant data
- [ ] CA-REP-002: Daily PDF consolidates multiple sessions
- [ ] CA-REP-003: PDF downloads with descriptive filename

## Dependencies
- TODO-06-sessions (complete)
- TODO-07-transactions (complete)
- TODO-08-inventory (complete)

## Testing
- See: TODO-17-reports-testing.md

## Status: PENDING