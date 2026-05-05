# TODO: Inventory Module Tests

## Tasks

### 16.1 Repository Tests
- [ ] Test inventoryMovementRepository.create() - incoming
- [ ] Test inventoryMovementRepository.create() - outgoing
- [ ] Test inventoryMovementRepository.create() - transfer
- [ ] Test inventoryMovementRepository.create() - adjustment
- [ ] Test inventoryMovementRepository.create() - damaged
- [ ] Test inventoryMovementRepository.create() - return
- [ ] Test inventoryMovementRepository.getBySession()
- [ ] Test inventoryMovementRepository.getByDateRange()
- [ ] Test inventoryMovementRepository.remove() - permanent delete

### 16.2 Hook Tests
- [ ] Test useInventoryMovements - fetchBySession()
- [ ] Test useInventoryMovements - createMovement()
- [ ] Test useInventoryMovements - deleteMovement()

### 16.3 Component Tests
- [ ] Test MovementCard - incoming
- [ ] Test MovementCard - outgoing
- [ ] Test MovementCard - transfer (shows destination)
- [ ] Test MovementList - renders movements

### 16.4 Dialog Tests
- [ ] Test IncomingDialog - with autocomplete
- [ ] Test OutgoingDialog
- [ ] Test TransferDialog - branch selector required

### 16.5 Integration Tests
- [ ] Test create incoming flow
- [ ] Test create transfer flow - branch selection

## Coverage Target: 80%

## Acceptance Criteria
- [ ] All movement types tested
- [ ] Transfer destination tested
- [ ] Receipt type autocomplete tested

## Dependencies
- TODO-08-inventory (complete)
- TODO-12-testing-environment (complete)

## Status: PENDING