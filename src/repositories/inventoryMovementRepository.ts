import { db } from '../db';
import type { InventoryMovement } from '../types/database';

export const inventoryMovementRepository = {
  async create(movement: Omit<InventoryMovement, 'id'>): Promise<number> {
    return await db.inventoryMovements.add({
      ...movement,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getBySession(sessionId: number): Promise<InventoryMovement[]> {
    return await db.inventoryMovements
      .where('sessionId')
      .equals(sessionId)
      .sortBy('movementDate');
  },

  async getByDateRange(
    dateFrom: Date,
    dateTo: Date,
    branchId?: number,
  ): Promise<InventoryMovement[]> {
    const collection = db.inventoryMovements
      .where('movementDate')
      .between(dateFrom, dateTo);

    if (branchId) {
      return await collection
        .and((m) => m.branchId === branchId)
        .toArray();
    }

    return await collection.toArray();
  },

  async getById(id: number): Promise<InventoryMovement | undefined> {
    return await db.inventoryMovements.get(id);
  },

  async remove(id: number): Promise<void> {
    await db.inventoryMovements.delete(id);
  },
};