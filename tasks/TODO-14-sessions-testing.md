# TODO: Cash Sessions Module Tests

## Tasks

### 14.1 Repository Tests
- [ ] Test cashSessionRepository.create() - success
- [ ] Test cashSessionRepository.getOpen() - returns open sessions
- [ ] Test cashSessionRepository.getClosed() - returns closed sessions
- [ ] Test cashSessionRepository.getById() - exists
- [ ] Test cashSessionRepository.getById() - not found
- [ ] Test cashSessionRepository.openSession() - sets status to open
- [ ] Test cashSessionRepository.closeSession() - sets status to closed
- [ ] Test cashSessionRepository.update() - success
- [ ] Test cashSessionRepository.remove() - delete open session
- [ ] Test cashSessionRepository.remove() - delete closed session

### 14.2 Hook Tests
- [ ] Test useCashSessions - fetchOpenSessions()
- [ ] Test useCashSessions - fetchClosedSessions()
- [ ] Test useCashSessions - createSession()
- [ ] Test useCashSessions - openSession()
- [ ] Test useCashSessions - closeSession()
- [ ] Test useCashSessions - updateSession()
- [ ] Test useCashSessions - deleteSession()

### 14.3 Component Tests
- [ ] Test SessionsPage - renders open sessions
- [ ] Test SessionsPage - renders closed sessions tab
- [ ] Test SessionsPage - open new session dialog
- [ ] Test SessionsPage - delete confirmation dialog
- [ ] Test SessionPage - renders session details
- [ ] Test SessionPage - balance summary cards
- [ ] Test SessionPage - transaction tabs
- [ ] Test SessionPage - inventory tabs
- [ ] Test NewSessionDialog - validation
- [ ] Test NewSessionDialog - create with branch
- [ ] Test CloseSessionDialog - shows estimated balance
- [ ] Test DeleteSessionConfirmDialog

### 14.4 Integration Tests
- [ ] Test create session flow
- [ ] Test close session flow
- [ ] Test delete session flow

## Coverage Target: 80%

## Acceptance Criteria
- [ ] All CRUD operations tested
- [ ] State transitions tested
- [ ] UI interactions tested

## Dependencies
- TODO-06-sessions (complete)
- TODO-12-testing-environment (complete)

## Status: PENDING