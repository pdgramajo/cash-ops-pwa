# TODO: Import/Export Module Tests

## Tasks

### 19.1 Export Service Tests
- [ ] Test exportService.generateExportObject() - session data
- [ ] Test exportService.generateExportObject() - includes transactions
- [ ] Test exportService.generateExportObject() - includes branch
- [ ] Test exportService.exportSession() - triggers download
- [ ] Test exportService.exportSession() - filename format

### 19.2 Import Service Tests
- [ ] Test importService.validateImportData() - valid structure
- [ ] Test importService.validateImportData() - invalid structure
- [ ] Test importService.importSession() - new branch created
- [ ] Test importService.importSession() - branch reused
- [ ] Test importService.importSession() - transactions imported

### 19.3 Component Tests
- [ ] Test SessionsPage - export button visible
- [ ] Test SessionsPage - export button disabled for open
- [ ] Test Header - import button
- [ ] Test ImportPreviewDialog - shows preview
- [ ] Test ImportPreviewDialog - confirms import
- [ ] Test ImportPreviewDialog - cancel import

### 19.4 Integration Tests
- [ ] Test export session flow
- [ ] Test import session flow
- [ ] Test round-trip (export then import)

## Coverage Target: 80%

## Acceptance Criteria
- [ ] Export format tested
- [ ] Import validation tested
- [ ] Branch handling tested

## Dependencies
- TODO-11-import-export (complete)
- TODO-12-testing-environment (complete)

## Status: PENDING