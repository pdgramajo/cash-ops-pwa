import { db } from '../db';
import type { Branch } from '../types/database';

export const branchRepository = {
  async create(branch: Omit<Branch, 'id'>): Promise<number> {
    return await db.branches.add({
      ...branch,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getAll(): Promise<Branch[]> {
    return await db.branches.toArray();
  },

  async getAllActive(): Promise<Branch[]> {
    return await db.branches.where('isActive').equals(1).toArray();
  },

  async getById(id: number): Promise<Branch | undefined> {
    return await db.branches.get(id);
  },

  async update(id: number, data: Partial<Branch>): Promise<void> {
    await db.branches.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async remove(id: number): Promise<void> {
    await db.branches.delete(id);
  },
};