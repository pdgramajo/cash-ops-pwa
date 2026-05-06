import { db } from '../db';
import type { Receipt } from '../types/database';
import { ReceiptStatus } from '../types/database';

export const receiptRepository = {
  async create(receipt: Omit<Receipt, 'id'>): Promise<number> {
    return await db.receipts.add({
      ...receipt,
    });
  },

  async getAll(): Promise<Receipt[]> {
    return await db.receipts.orderBy('createdAt').reverse().toArray();
  },

  async getBySession(sessionId: number): Promise<Receipt[]> {
    return await db.receipts.where('sessionId').equals(sessionId).toArray();
  },

  async getByBranch(branchId: number): Promise<Receipt[]> {
    return await db.receipts.where('branchId').equals(branchId).toArray();
  },

  async getById(id: number): Promise<Receipt | undefined> {
    return await db.receipts.get(id);
  },

  async update(id: number, data: Partial<Receipt>): Promise<void> {
    await db.receipts.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async markPrinted(id: number): Promise<void> {
    await db.receipts.update(id, {
      status: ReceiptStatus.PRINTED,
      printedAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async markDelivered(id: number): Promise<void> {
    await db.receipts.update(id, {
      status: ReceiptStatus.DELIVERED,
      deliveredAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async cancel(id: number): Promise<void> {
    await db.receipts.update(id, {
      status: ReceiptStatus.CANCELLED,
      updatedAt: new Date(),
    });
  },

  async remove(id: number): Promise<void> {
    await db.receipts.delete(id);
  },

  async getNextReceiptNumber(): Promise<string> {
    const count = await db.receipts.count();
    const num = count + 1;
    return `R${String(num).padStart(6, '0')}`;
  },
};