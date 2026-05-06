import { db } from '../db';
import type { Branch, CashSession, Transaction, InventoryMovement, Receipt, ReceiptType } from '../types/database';

export interface ExportData {
  version: number;
  exportedAt: string;
  branches: Branch[];
  cashSessions: CashSession[];
  transactions: Transaction[];
  inventoryMovements: InventoryMovement[];
  receipts: Receipt[];
  receiptTypes: ReceiptType[];
}

export const exportRepository = {
  async exportAll(): Promise<string> {
    const data: ExportData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      branches: await db.branches.toArray(),
      cashSessions: await db.cashSessions.toArray(),
      transactions: await db.transactions.toArray(),
      inventoryMovements: await db.inventoryMovements.toArray(),
      receipts: await db.receipts.toArray(),
      receiptTypes: await db.receiptTypes.toArray(),
    };
    return JSON.stringify(data, null, 2);
  },

  async exportByDateRange(startDate: Date, endDate: Date): Promise<string> {
    const data: ExportData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      branches: await db.branches.toArray(),
      cashSessions: await db.cashSessions
        .where('openedAt')
        .between(startDate, endDate)
        .toArray(),
      transactions: await db.transactions
        .where('processedAt')
        .between(startDate, endDate)
        .toArray(),
      inventoryMovements: await db.inventoryMovements
        .where('movementDate')
        .between(startDate, endDate)
        .toArray(),
      receipts: await db.receipts
        .where('createdAt')
        .between(startDate, endDate)
        .toArray(),
      receiptTypes: await db.receiptTypes.toArray(),
    };
    return JSON.stringify(data, null, 2);
  },

  async exportBranches(): Promise<string> {
    const branches = await db.branches.toArray();
    return JSON.stringify(branches, null, 2);
  },

  async exportSessions(): Promise<string> {
    const sessions = await db.cashSessions.toArray();
    return JSON.stringify(sessions, null, 2);
  },

  async exportTransactions(): Promise<string> {
    const transactions = await db.transactions.toArray();
    return JSON.stringify(transactions, null, 2);
  },

  downloadFile(json: string, filename: string): void {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};