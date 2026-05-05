import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../db';
import { branchRepository } from '../repositories/branchRepository';

describe('BranchRepository', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  it('should create a branch', async () => {
    const id = await branchRepository.create({
      name: 'Test Branch',
      address: 'Test Address 123',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    expect(id).toBeGreaterThan(0);
  });

  it('should get all branches', async () => {
    await branchRepository.create({
      name: 'Branch 1',
      address: 'Address 1',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await branchRepository.create({
      name: 'Branch 2',
      address: 'Address 2',
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const branches = await branchRepository.getAll();
    expect(branches.length).toBe(2);
  });

  it('should get branch by id', async () => {
    const id = await branchRepository.create({
      name: 'Test Branch',
      address: 'Test Address',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const branch = await branchRepository.getById(id);
    expect(branch?.name).toBe('Test Branch');
  });

  it('should update a branch', async () => {
    const id = await branchRepository.create({
      name: 'Test Branch',
      address: 'Test Address',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await branchRepository.update(id, { name: 'Updated Branch' });
    const branch = await branchRepository.getById(id);
    expect(branch?.name).toBe('Updated Branch');
  });

  it('should delete a branch', async () => {
    const id = await branchRepository.create({
      name: 'Test Branch',
      address: 'Test Address',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await branchRepository.remove(id);
    const branch = await branchRepository.getById(id);
    expect(branch).toBeUndefined();
  });
});