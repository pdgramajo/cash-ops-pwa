import { db } from '../db';
import type { Report } from '../types/database';

export const reportRepository = {
  async create(report: Omit<Report, 'id'>): Promise<number> {
    return await db.reports.add({
      ...report,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getAll(): Promise<Report[]> {
    return await db.reports.toArray();
  },

  async getByBranch(branchId: number): Promise<Report[]> {
    return await db.reports.where('branchId').equals(branchId).toArray();
  },

  async getById(id: number): Promise<Report | undefined> {
    return await db.reports.get(id);
  },

  async remove(id: number): Promise<void> {
    await db.reports.delete(id);
  },
};