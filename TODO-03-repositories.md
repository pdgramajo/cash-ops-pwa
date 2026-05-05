# TODO: Repositories and Data Layer

## Tasks

### 3.1 Create Branch Repository
- [ ] Create branchRepository.ts
- [ ] Implement create(branch): Promise<void>
- [ ] Implement getAll(): Promise<Branch[]>
- [ ] Implement getById(id): Promise<Branch | undefined>
- [ ] Implement update(id, data): Promise<void>
- [ ] Implement remove(id): Promise<void>

### 3.2 Create CashSession Repository
- [ ] Create cashSessionRepository.ts
- [ ] Implement create(session): Promise<void>
- [ ] Implement getAll(): Promise<CashSession[]>
- [ ] Implement getOpen(): Promise<CashSession[]>
- [ ] Implement getClosed(): Promise<CashSession[]>
- [ ] Implement getById(id): Promise<CashSession | undefined>
- [ ] Implement openSession(id, openingBalance): Promise<void>
- [ ] Implement closeSession(id, closingBalance): Promise<void>
- [ ] Implement update(id, data): Promise<void>
- [ ] Implement remove(id): Promise<void>

### 3.3 Create Transaction Repository
- [ ] Create transactionRepository.ts
- [ ] Implement create(transaction): Promise<void>
- [ ] Implement getBySession(sessionId): Promise<Transaction[]>
- [ ] Implement getByDateRange( dateFrom, dateTo, branchId? ): Promise<Transaction[]>
- [ ] Implement softDelete(id): Promise<void>
- [ ] Implement calculateTotals(sessionId): Promise<CashTotals>

### 3.4 Create InventoryMovement Repository
- [ ] Create inventoryMovementRepository.ts
- [ ] Implement create(movement): Promise<void>
- [ ] Implement getBySession(sessionId): Promise<InventoryMovement[]>
- [ ] Implement getByDateRange( dateFrom, dateTo, branchId? ): Promise<InventoryMovement[]>
- [ ] Implement remove(id): Promise<void>

### 3.5 Create ReceiptType Repository
- [ ] Create receiptTypeRepository.ts
- [ ] Implement create(type): Promise<void>
- [ ] Implement getAll(): Promise<ReceiptType[]>

### 3.6 Create Report Repository
- [ ] Create reportRepository.ts
- [ ] Implement create(report): Promise<void>
- [ ] Implement getAll(): Promise<Report[]>

## Dependencies
- TODO-02-database (complete)

## Status: PENDING