import { db } from '../db';
import type { Transaction } from '../types/database';
import { TransactionType } from '../types/database';

export interface CashTotals {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export const transactionRepository = {
  async create(transaction: Omit<Transaction, 'id'>): Promise<number> {
    return await db.transactions.add({
      ...transaction,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getBySession(sessionId: number): Promise<Transaction[]> {
    return await db.transactions
      .where('sessionId')
      .equals(sessionId)
      .sortBy('processedAt');
  },

  async getByDateRange(
    dateFrom: Date,
    dateTo: Date,
    branchId?: number,
  ): Promise<Transaction[]> {
    const collection = db.transactions
      .where('processedAt')
      .between(dateFrom, dateTo);

    if (branchId) {
      return await collection
        .and((t) => t.branchId === branchId)
        .toArray();
    }

    return await collection.toArray();
  },

  async getById(id: number): Promise<Transaction | undefined> {
    return await db.transactions.get(id);
  },

  async softDelete(id: number): Promise<void> {
    await db.transactions.update(id, {
      description: '[DELETED]',
      updatedAt: new Date(),
    });
  },

  async calculateTotals(sessionId: number): Promise<CashTotals> {
    const transactions = await this.getBySession(sessionId);

    let totalIncome = 0;
    let totalExpense = 0;

    for (const tx of transactions) {
      if (tx.type === TransactionType.INCOME) {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
      }
    }

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  },

  async remove(id: number): Promise<void> {
    await db.transactions.delete(id);
  },
};