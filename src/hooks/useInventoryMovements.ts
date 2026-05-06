import { useState, useCallback, useMemo } from 'react';
import { inventoryMovementRepository } from '../repositories/inventoryMovementRepository';
import type { InventoryMovement } from '../types/database';
import { InventoryMovementType } from '../types/database';

interface UseInventoryMovementsReturn {
  movements: InventoryMovement[];
  loading: boolean;
  error: string | null;
  totalIncoming: number;
  totalOutgoing: number;
  fetchBySession: (sessionId: number) => Promise<void>;
  fetchByDateRange: (dateFrom: Date, dateTo: Date, branchId?: number) => Promise<void>;
  createMovement: (data: Omit<InventoryMovement, 'id'>) => Promise<InventoryMovement | null>;
  deleteMovement: (id: number) => Promise<boolean>;
}

export function useInventoryMovements(): UseInventoryMovementsReturn {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totals = useMemo(() => {
    let incoming = 0;
    let outgoing = 0;
    for (const m of movements) {
      if (m.type === InventoryMovementType.ENTRY) incoming += m.quantity;
      else if (m.type === InventoryMovementType.EXIT) outgoing += m.quantity;
    }
    return { incoming, outgoing };
  }, [movements]);

  const fetchBySession = useCallback(async (sessionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryMovementRepository.getBySession(sessionId);
      const sorted = [...data].sort((a, b) => 
        new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime()
      );
      setMovements(sorted);
    } catch {
      setError('Error loading movements');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByDateRange = useCallback(async (dateFrom: Date, dateTo: Date, branchId?: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await inventoryMovementRepository.getByDateRange(dateFrom, dateTo, branchId);
      setMovements(data);
    } catch {
      setError('Error loading movements');
    } finally {
      setLoading(false);
    }
  }, []);

  const createMovement = useCallback(async (data: Omit<InventoryMovement, 'id'>): Promise<InventoryMovement | null> => {
    setLoading(true);
    setError(null);
    try {
      const id = await inventoryMovementRepository.create(data);
      await fetchBySession(data.sessionId!);
      return { ...data, id: id as number };
    } catch {
      setError('Error creating movement');
      return null;
    }
  }, [fetchBySession]);

  const deleteMovement = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await inventoryMovementRepository.remove(id);
      setMovements(prev => prev.filter(m => m.id !== id));
      return true;
    } catch {
      setError('Error deleting movement');
      return false;
    }
  }, []);

  return {
    movements,
    loading,
    error,
    totalIncoming: totals.incoming,
    totalOutgoing: totals.outgoing,
    fetchBySession,
    fetchByDateRange,
    createMovement,
    deleteMovement,
  };
}