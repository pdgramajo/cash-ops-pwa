# TODO: Database Configuration

## Tasks

### 2.1 Configure Dexie.js database
- [ ] Initialize db/index.ts with Dexie
- [ ] Define schema version 1: branches, cashSessions, transactions, inventoryMovements, reports
- [ ] Define schema version 2: add receiptTypes table
- [ ] Configure database name: cashOperationsDB

### 2.2 Create database types
- [ ] Define Branch interface
- [ ] Define CashSession interface with SessionStatus
- [ ] Define Transaction interface with TransactionType, TransactionSubType, RecipientType
- [ ] Define InventoryMovement interface with InventoryMovementType, MovementUnit
- [ ] Define ReceiptType interface
- [ ] Define Report interface with ReportType

### 2.3 Setup database versioning
- [ ] Implement migration logic for version upgrades
- [ ] Test database initialization

## Dependencies
- TODO-01-project-setup (complete)

## Status: PENDING