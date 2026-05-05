import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { db, initializeDatabase, closeDatabase, CashOperationsDB } from './index';

describe('Database', () => {
  beforeEach(async () => {
    await db.delete();
    await db.open();
  });

  afterEach(async () => {
    await closeDatabase();
  });

  it('should initialize database successfully', async () => {
    await initializeDatabase();
    const isOpen = db.isOpen();
    expect(isOpen).toBe(true);
  });

  it('should have all required tables', async () => {
    await initializeDatabase();
    const tableNames = db.tables.map(t => t.name);
    expect(tableNames).toContain('branches');
    expect(tableNames).toContain('cashSessions');
    expect(tableNames).toContain('transactions');
    expect(tableNames).toContain('inventoryMovements');
    expect(tableNames).toContain('receiptTypes');
    expect(tableNames).toContain('reports');
  });

  it('should create CashOperationsDB instance', () => {
    const database = new CashOperationsDB();
    expect(database).toBeDefined();
    expect(database.name).toBe('cashOperationsDB');
  });

  it('should have receiptTypes table after version 2', async () => {
    await initializeDatabase();
    const tableNames = db.tables.map(t => t.name);
    expect(tableNames).toContain('receiptTypes');
  });

  it('should close database successfully', async () => {
    await initializeDatabase();
    await closeDatabase();
    const isOpen = db.isOpen();
    expect(isOpen).toBe(false);
  });
});