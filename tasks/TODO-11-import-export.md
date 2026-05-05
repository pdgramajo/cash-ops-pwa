# TODO: Import/Export Functionality

## Tasks

### 11.1 Create Export Service
- [ ] Create exportService.ts
- [ ] Implement exportSession(sessionId): Promise<void>
- [ ] Implement generateExportObject(sessionId): ExportData

### 11.2 Create Import Service
- [ ] Create importService.ts
- [ ] Implement importSession(file): Promise<CashSession>
- [ ] Implement validateImportData(data): boolean
- [ ] Implement getOrCreateBranch(branchName): Promise<Branch>

### 11.3 Implement Import/Export UI
- [ ] Add export button to session cards (closed sessions)
- [ ] Add import button in header
- [ ] Create ImportPreviewDialog component

### 11.4 Handle Import/Export Operations
- [ ] RF-SES-007: Export session to JSON
- [ ] RF-SES-008: Import session from JSON

## Acceptance Criteria
- [ ] JSON export contains all session data
- [ ] JSON import creates session with transactions

## Dependencies
- TODO-06-sessions (complete)
- TODO-07-transactions (complete)

## Testing
- See: TODO-19-import-export-testing.md

## Status: PENDING