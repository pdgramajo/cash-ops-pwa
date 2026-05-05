# TODO: Reports Module Tests

## Tasks

### 17.1 Service Tests
- [ ] Test reportService.generateSessionReport() - session data
- [ ] Test reportService.generateSessionReport() - cash summary
- [ ] Test reportService.generateSessionReport() - transfer summary
- [ ] Test reportService.generateSessionReport() - expenses
- [ ] Test reportService.generateSessionReport() - withdrawals
- [ ] Test reportService.generateSessionReport() - inventory
- [ ] Test reportService.generateDailyReport() - single session
- [ ] Test reportService.generateDailyReport() - multiple sessions
- [ ] Test reportService.generateDailyReport() - by branch filter
- [ ] Test reportService.downloadPDF() - filename
- [ ] Test reportService.downloadPDF() - triggers download

### 17.2 Component Tests
- [ ] Test ReportsPage - renders tabs
- [ ] Test ReportsPage - Por Sesión tab
- [ ] Test ReportsPage - Diario tab
- [ ] Test ReportsPage - date picker
- [ ] Test ReportsPage - branch selector
- [ ] Test ReportsPage - generate button
- [ ] Test ReportsPage - loading indicator

### 17.3 Integration Tests
- [ ] Test generate session report flow
- [ ] Test generate daily report flow

## Coverage Target: 80%

## Acceptance Criteria
- [ ] PDF content structure tested
- [ ] Consolidation logic tested
- [ ] Download functionality tested

## Dependencies
- TODO-09-reports (complete)
- TODO-12-testing-environment (complete)

## Status: PENDING