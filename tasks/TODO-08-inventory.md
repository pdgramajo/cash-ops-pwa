# TODO: Inventory Management Module

## Tasks

### 8.1 Create InventoryMovement Types and Hooks
- [ ] Define InventoryMovementType: 'incoming' | 'outgoing' | 'transfer' | 'adjustment' | 'damaged' | 'return'
- [ ] Define MovementUnit: 'kg' | 'unit' | 'half' | 'quarter'
- [ ] Create useInventoryMovements hook:
  - fetchBySession(sessionId): void
  - createMovement(data): Promise<InventoryMovement>
  - deleteMovement(id): Promise<void>

### 8.2 Create Inventory Components
- [ ] Create MovementCard component
- [ ] Create MovementList component

### 8.3 Implement Inventory Operations
- [ ] RF-INV-001: Register incoming (with receipt type autocomplete)
- [ ] RF-INV-002: Register outgoing
- [ ] RF-INV-003: Register transfer between branches
- [ ] RF-INV-004: List movements (chronological)
- [ ] RF-INV-005: Delete movement (permanent)

### 8.4 Handle Inventory Dialogs
- [ ] Create IncomingDialog component (with receipt type autocomplete)
- [ ] Create OutgoingDialog component
- [ ] Create TransferDialog component (with branch selector)

## Acceptance Criteria
- [ ] CA-INV-001: Transfer shows branch destination selector
- [ ] CA-INV-002: Movements appear in session list

## Dependencies
- TODO-06-sessions (complete)

## Testing
- See: TODO-16-inventory-testing.md

## Status: PENDING