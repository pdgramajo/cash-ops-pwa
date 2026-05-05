# TODO: Branch Management Module

## Tasks

### 5.1 Create Branch Types and Hooks
- [ ] Define Branch interface in types/
- [ ] Create useBranches hook:
  - fetchBranches(): void
  - createBranch(name): Promise<Branch>
  - updateBranch(id, name): Promise<void>
  - deleteBranch(id): Promise<boolean>

### 5.2 Create Branch UI Components
- [ ] Create BranchList component (display all branches)
- [ ] Create BranchForm component (create/edit form)
- [ ] Create BranchCard component (branch display)

### 5.3 Implement Branch CRUD Operations
- [ ] RF-SUC-001: Create branch (with validation)
- [ ] RF-SUC-002: List branches (alphabetical order)
- [ ] RF-SUC-003: Update branch (prevent duplicates)
- [ ] RF-SUC-004: Delete branch (check for sessions)

### 5.4 Handle Branch Dialogs
- [ ] Create NewBranchDialog component
- [ ] Create EditBranchDialog component
- [ ] Create DeleteBranchConfirmDialog component

## Acceptance Criteria
- [ ] CA-SUC-001: Branch appears immediately in list after creation
- [ ] CA-SUC-002: Duplicate names show error message
- [ ] CA-SUC-003: Warning shown when deleting branch with sessions

## Dependencies
- TODO-03-repositories (complete)
- TODO-04-routing-ui (complete)

## Testing
- See: TODO-13-branches-testing.md

## Status: PENDING