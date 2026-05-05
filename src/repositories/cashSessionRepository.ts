import { db } from '../db';
import type { CashSession } from '../types/database';
import { SessionStatus } from '../types/database';

export const cashSessionRepository = {
  async create(session: Omit<CashSession, 'id'>): Promise<number> {
    return await db.cashSessions.add({
      ...session,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getAll(): Promise<CashSession[]> {
    return await db.cashSessions.toArray();
  },

  async getOpen(): Promise<CashSession[]> {
    return await db.cashSessions
      .where('status')
      .equals(SessionStatus.OPEN)
      .toArray();
  },

  async getOpenByBranch(branchId: number): Promise<CashSession[]> {
    return await db.cashSessions
      .where(['branchId', 'status'])
      .equals([branchId, SessionStatus.OPEN])
      .toArray();
  },

  async getClosed(): Promise<CashSession[]> {
    return await db.cashSessions
      .where('status')
      .equals(SessionStatus.CLOSED)
      .toArray();
  },

  async getById(id: number): Promise<CashSession | undefined> {
    return await db.cashSessions.get(id);
  },

  async openSession(branchId: number, openingBalance: number, openedBy: string): Promise<number> {
    return await db.cashSessions.add({
      branchId,
      openingBalance,
      status: SessionStatus.OPEN,
      openedAt: new Date(),
      openedBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async closeSession(
    id: number,
    closingBalance: number,
    closedBy: string,
    notes?: string,
  ): Promise<void> {
    await db.cashSessions.update(id, {
      closingBalance,
      expectedBalance: closingBalance,
      status: SessionStatus.CLOSED,
      closedAt: new Date(),
      closedBy,
      notes,
      updatedAt: new Date(),
    });
  },

  async update(id: number, data: Partial<CashSession>): Promise<void> {
    await db.cashSessions.update(id, {
      ...data,
      updatedAt: new Date(),
    });
  },

  async remove(id: number): Promise<void> {
    await db.cashSessions.delete(id);
  },
};