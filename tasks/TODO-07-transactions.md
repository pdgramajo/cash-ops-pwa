# TODO: Transactions Module

## Tasks

### 7.1 Create Transaction Types and Hooks
- [ ] Define TransactionType: 'sale' | 'expense' | 'cash_withdrawal' | 'opening_balance' | 'refund' | 'adjustment'
- [ ] Define TransactionSubType: 'cash' | 'transfer'
- [ ] Define RecipientType: 'owner' | 'employee' | 'messenger' | 'supplier' | 'branch_transfer' | 'other'
- [ ] Create useTransactions hook:
  - fetchBySession(sessionId): void
  - createTransaction(data): Promise<Transaction>
  - deleteTransaction(id): Promise<void>
  - calculateTotals(sessionId): CashTotals

### 7.2 Create Transaction Components
- [ ] Create TransactionCard component (color-coded by type)
- [ ] Create TransactionFilter component (tabs: All, Cash, Transfer, Expenses)
- [ ] Create QuickAmounts component (frequent amounts from yesterday)

### 7.3 Implement Transaction Operations
- [ ] RF-TRA-001: Register cash sale
- [ ] RF-TRA-002: Register transfer sale
- [ ] RF-TRA-003: Register expense
- [ ] RF-TRA-004: Register cash withdrawal
- [ ] RF-TRA-005: List transactions (chronological)
- [ ] RF-TRA-006: Filter transactions by type
- [ ] RF-TRA-007: Delete transaction (soft-delete)
- [ ] RF-TRA-008: Calculate real-time totals
- [ ] RF-TRA-009: Show quick amounts based on history

### 7.4 Handle Transaction Dialogs
- [ ] Create SaleDialog component (cash/transfer tabs)
- [ ] Create ExpenseDialog component
- [ ] Create WithdrawalDialog component (with recipient types)

## Acceptance Criteria
- [ ] CA-TRA-001: Sale appears immediately in transaction list
- [ ] CA-TRA-002: Filters show correct element counts
- [ ] CA-TRA-003: Quick amounts show relevant values from history
- [ ] CA-TRA-004: Deleted transaction removed from calculations and lists
- [ ] CA-TRA-005: Totals calculate correctly (non-deleted only)

## Dependencies
- TODO-06-sessions (complete)

## Testing
- See: TODO-15-transactions-testing.md

## Status: PENDING