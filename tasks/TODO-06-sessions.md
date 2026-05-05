# TODO: Cash Sessions Management Module

## Tasks

### 6.1 Create CashSession Types and Hooks
- [ ] Define CashSession interface in types/
- [ ] Define SessionStatus type: 'open' | 'closed'
- [ ] Create useCashSessions hook:
  - fetchOpenSessions(): void
  - fetchClosedSessions(): void
  - createSession(name, branchId?, openingBalance, notes?): Promise<CashSession>
  - openSession(id, openingBalance): Promise<void>
  - closeSession(id, closingBalance): Promise<void>
  - updateSession(id, data): Promise<void>
  - deleteSession(id): Promise<void>

### 6.2 Create SessionsPage Component
- [ ] Create SessionsPage layout
- [ ] Implement open sessions section (green indicator)
- [ ] Implement closed sessions tab (History)
- [ ] Create session cards with quick actions

### 6.3 Create SessionPage (Detail) Component
- [ ] Create SessionPage layout
- [ ] Display session details: name, branch, dates, balances
- [ ] Implement balance summary cards (2x2 grid)
- [ ] Implement action buttons: Sale, Expense, Withdrawal
- [ ] Implement tabs: Transactions, Inventory

### 6.4 Implement Session CRUD Operations
- [ ] RF-SES-001: Create session (with validation)
- [ ] RF-SES-002: List open sessions
- [ ] RF-SES-003: List closed sessions (History tab)
- [ ] RF-SES-004: View session detail
- [ ] RF-SES-005: Update opening balance
- [ ] RF-SES-006: Close session
- [ ] RF-SES-007: Export session to JSON
- [ ] RF-SES-008: Import session from JSON
- [ ] RF-SES-009: Delete session

### 6.5 Handle Session Dialogs
- [ ] Create NewSessionDialog component
- [ ] Create CloseSessionDialog component
- [ ] Create DeleteSessionConfirmDialog component

## Acceptance Criteria
- [ ] CA-SES-001: New session appears in open sessions with visual indicator
- [ ] CA-SES-002: Click on session navigates to detail
- [ ] CA-SES-003: Estimated balance updates in real-time
- [ ] CA-SES-004: Closing balance saved correctly
- [ ] CA-SES-005: JSON export contains all session data
- [ ] CA-SES-006: JSON import creates session with transactions

## Dependencies
- TODO-03-repositories (complete)
- TODO-04-routing-ui (complete)
- TODO-05-branches (complete)

## Testing
- See: TODO-14-sessions-testing.md

## Status: PENDING