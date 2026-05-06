import { db } from '../db';
import type { Branch, CashSession, Transaction, InventoryMovement, Receipt, ReceiptType } from '../types/database';
import { type ExportData } from './exportService';

export const importRepository = {
  async validateImportData(jsonString: string): Promise<{ valid: boolean; error?: string; data?: ExportData }> {
    try {
      const data = JSON.parse(jsonString) as ExportData;
      
      if (!data.version || !data.exportedAt) {
        return { valid: false, error: 'Invalid export file format' };
      }
      
      if (!data.branches || !Array.isArray(data.branches)) {
        return { valid: false, error: 'Invalid branches data' };
      }
      
      return { valid: true, data };
    } catch (e) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  },

  async importAll(jsonString: string, options?: { merge?: boolean }): Promise<{ imported: number; errors: string[] }> {
    const errors: string[] = [];
    let imported = 0;
    
    const validation = await this.validateImportData(jsonString);
    if (!validation.valid || !validation.data) {
      return { imported: 0, errors: [validation.error || 'Invalid data'] };
    }
    
    const data = validation.data;
    const merge = options?.merge ?? true;
    
    try {
      if (!merge) {
        await db.branches.clear();
        await db.cashSessions.clear();
        await db.transactions.clear();
        await db.inventoryMovements.clear();
        await db.receipts.clear();
      }
      
      if (data.branches?.length > 0) {
        const existing = await db.branches.toArray();
        const existingIds = new Set(existing.map((b: Branch) => b.id));
        const newBranches = data.branches.filter((b: Branch) => !existingIds.has(b.id));
        if (newBranches.length > 0) {
          await db.branches.bulkPut(newBranches);
          imported += newBranches.length;
        }
      }
      
      if (data.cashSessions?.length > 0) {
        const existing = await db.cashSessions.toArray();
        const existingIds = new Set(existing.map((s: CashSession) => s.id));
        const newSessions = data.cashSessions.filter((s: CashSession) => !existingIds.has(s.id));
        if (newSessions.length > 0) {
          await db.cashSessions.bulkPut(newSessions);
          imported += newSessions.length;
        }
      }
      
      if (data.transactions?.length > 0) {
        const existing = await db.transactions.toArray();
        const existingIds = new Set(existing.map((t: Transaction) => t.id));
        const newTransactions = data.transactions.filter((t: Transaction) => !existingIds.has(t.id));
        if (newTransactions.length > 0) {
          await db.transactions.bulkPut(newTransactions);
          imported += newTransactions.length;
        }
      }
      
      if (data.inventoryMovements?.length > 0) {
        const existing = await db.inventoryMovements.toArray();
        const existingIds = new Set(existing.map((i: InventoryMovement) => i.id));
        const newMovements = data.inventoryMovements.filter((i: InventoryMovement) => !existingIds.has(i.id));
        if (newMovements.length > 0) {
          await db.inventoryMovements.bulkPut(newMovements);
          imported += newMovements.length;
        }
      }
      
      if (data.receipts?.length > 0) {
        const existing = await db.receipts.toArray();
        const existingIds = new Set(existing.map((r: Receipt) => r.id));
        const newReceipts = data.receipts.filter((r: Receipt) => !existingIds.has(r.id));
        if (newReceipts.length > 0) {
          await db.receipts.bulkPut(newReceipts);
          imported += newReceipts.length;
        }
      }
      
      if (data.receiptTypes?.length > 0) {
        const existing = await db.receiptTypes.toArray();
        const existingCodes = new Set(existing.map((r: ReceiptType) => r.code));
        const newTypes = data.receiptTypes.filter((r: ReceiptType) => !existingCodes.has(r.code));
        if (newTypes.length > 0) {
          await db.receiptTypes.bulkPut(newTypes);
          imported += newTypes.length;
        }
      }
    } catch (e) {
      errors.push(`Import error: ${e}`);
    }
    
    return { imported, errors };
  },

  async importBranches(jsonString: string): Promise<{ imported: number }> {
    try {
      const data = JSON.parse(jsonString) as Branch[];
      if (!Array.isArray(data)) {
        return { imported: 0 };
      }
      
      const existing = await db.branches.toArray();
      const existingIds = new Set(existing.map((b: Branch) => b.id));
      const newBranches = data.filter((b: Branch) => !existingIds.has(b.id));
      
      if (newBranches.length > 0) {
        await db.branches.bulkPut(newBranches);
      }
      
      return { imported: newBranches.length };
    } catch {
      return { imported: 0 };
    }
  },

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },
};