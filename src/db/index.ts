import Dexie, { type Table } from 'dexie';
import type {
  Branch,
  CashSession,
  Transaction,
  InventoryMovement,
  ReceiptType,
  Report,
} from '../types/database';

export class CashOperationsDB extends Dexie {
  branches!: Table<Branch, number>;
  cashSessions!: Table<CashSession, number>;
  transactions!: Table<Transaction, number>;
  inventoryMovements!: Table<InventoryMovement, number>;
  receiptTypes!: Table<ReceiptType, number>;
  reports!: Table<Report, number>;

  constructor() {
    super('cashOperationsDB');

    this.version(1).stores({
      branches: '++id, name, isActive, createdAt',
      cashSessions: '++id, branchId, status, openedAt, closedAt',
      transactions: '++id, sessionId, branchId, type, subType, processedAt',
      inventoryMovements: '++id, branchId, sessionId, productCode, type, movementDate',
      reports: '++id, branchId, type, generatedAt',
    });

    this.version(2).stores({
      branches: '++id, name, isActive, createdAt',
      cashSessions: '++id, branchId, status, openedAt, closedAt',
      transactions: '++id, sessionId, branchId, type, subType, processedAt',
      inventoryMovements: '++id, branchId, sessionId, productCode, type, movementDate',
      receiptTypes: '++id, code, isActive',
      reports: '++id, branchId, type, generatedAt',
    }).upgrade(tx => {
      return tx.table('receiptTypes').add({
        code: 'DEFAULT',
        name: 'Recibo Padrón',
        description: 'Recibo estándar para operaciones',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    this.version(3).stores({
      branches: '++id, name, isActive, createdAt',
      cashSessions: '++id, branchId, status, openedAt, closedAt',
      transactions: '++id, sessionId, branchId, type, subType, processedAt',
      inventoryMovements: '++id, branchId, sessionId, productCode, type, movementDate',
      receiptTypes: '++id, code, isActive',
      reports: '++id, branchId, type, generatedAt',
    }).upgrade(tx => {
      // Add default branches if none exist
      return tx.table('branches').count().then(async (count) => {
        if (count === 0) {
          const now = new Date();
          await tx.table('branches').bulkAdd([
            { name: 'Casa Central', address: 'Av. Principal 100', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Sucursal Norte', address: 'Av. Norte 500', isActive: true, createdAt: now, updatedAt: now },
            { name: 'Sucursal Sur', address: 'Av. Sur 200', isActive: true, createdAt: now, updatedAt: now },
          ]);
        }
      });
    });
  }
}

export const db = new CashOperationsDB();

export async function initializeDatabase(): Promise<void> {
  await db.open();
}

export async function closeDatabase(): Promise<void> {
  await db.close();
}

export async function deleteDatabase(): Promise<void> {
  await db.delete();
  await db.open();
}