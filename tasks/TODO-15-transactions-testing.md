# TODO: Transactions Module Tests

## Tasks

### 15.1 Repository Tests
- [ ] Test transactionRepository.create() - cash sale
- [ ] Test transactionRepository.create() - transfer sale
- [ ] Test transactionRepository.create() - expense
- [ ] Test transactionRepository.create() - withdrawal
- [ ] Test transactionRepository.getBySession() - returns non-deleted
- [ ] Test transactionRepository.getBySession() - filters deleted
- [ ] Test transactionRepository.getByDateRange()
- [ ] Test transactionRepository.softDelete() - sets isDeleted true
- [ ] Test transactionRepository.calculateTotals() - cash sales
- [ ] Test transactionRepository.calculateTotals() - transfer sales
- [ ] Test transactionRepository.calculateTotals() - expenses
- [ ] Test transactionRepository.calculateTotals() - withdrawals
- [ ] Test transactionRepository.calculateTotals() - excludes deleted

### 15.2 Hook Tests
- [ ] Test useTransactions - fetchBySession()
- [ ] Test useTransactions - createTransaction()
- [ ] Test useTransactions - deleteTransaction()
- [ ] Test useTransactions - calculateTotals()

### 15.3 Component Tests
- [ ] Test TransactionCard - cash sale (green)
- [ ] Test TransactionCard - transfer sale (blue)
- [ ] Test TransactionCard - expense (red)
- [ ] Test TransactionCard - withdrawal (red)
- [ ] Test TransactionFilter - All tab
- [ ] Test TransactionFilter - Cash tab
- [ ] Test TransactionFilter - Transfer tab
- [ ] Test TransactionFilter - Expenses tab
- [ ] Test QuickAmounts - shows from history

### 15.4 Dialog Tests
- [ ] Test SaleDialog - cash sale
- [ ] Test SaleDialog - transfer sale
- [ ] Test ExpenseDialog - validation
- [ ] Test WithdrawalDialog - with recipient types

### 15.5 Integration Tests
- [ ] Test create sale flow - updates totals in real-time
- [ ] Test filter transaction flow - shows counts
- [ ] Test delete transaction flow - removes from totals

## Coverage Target: 80%

## Acceptance Criteria
- [ ] All transaction types tested
- [ ] Color coding tested
- [ ] Filtering logic tested
- [ ] Quick amounts logic tested
- [ ] Totals calculation tested

## Dependencies
- TODO-07-transactions (complete)
- TODO-12-testing-environment (complete)

## Status: PENDING