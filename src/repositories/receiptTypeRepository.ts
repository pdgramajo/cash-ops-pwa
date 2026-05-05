import { db } from '../db';
import type { ReceiptType } from '../types/database';

export const receiptTypeRepository = {
  async create(type: Omit<ReceiptType, 'id'>): Promise<number> {
    return await db.receiptTypes.add({
      ...type,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getAll(): Promise<ReceiptType[]> {
    return await db.receiptTypes.toArray();
  },

  async getActive(): Promise<ReceiptType[]> {
    return await db.receiptTypes.where('isActive').equals(1).toArray();
  },

  async getById(id: number): Promise<ReceiptType | undefined> {
    return await db.receiptTypes.get(id);
  },

  async getByCode(code: string): Promise<ReceiptType | undefined> {
    return await db.receiptTypes.where('code').equals(code).first();
  },
};