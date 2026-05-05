import { useState, useCallback, useEffect } from 'react';
import { cashSessionRepository } from '../repositories/cashSessionRepository';
import { transactionRepository } from '../repositories/transactionRepository';
import type { CashSession, Transaction } from '../types/database';
import { SessionStatus } from '../types/database';
import { calculateSessionTotals } from '../utils/calculations';

interface UseCashSessionsReturn {
  openSessions: CashSession[];
  closedSessions: CashSession[];
  loading: boolean;
  error: string | null;
  fetchOpenSessions: () => Promise<void>;
  fetchClosedSessions: () => Promise<void>;
  createSession: (branchId: number, openingBalance: number, openedBy: string, notes?: string) => Promise<CashSession | null>;
  openSession: (id: number, openingBalance: number) => Promise<void>;
  closeSession: (id: number, closingBalance: number, closedBy: string, notes?: string) => Promise<void>;
  getSessionTransactions: (sessionId: number) => Promise<Transaction[]>;
  calculateSessionTotals: (sessionId: number) => Promise<ReturnType<typeof calculateSessionTotals> | null>;
}

export function useCashSessions(): UseCashSessionsReturn {
  const [openSessions, setOpenSessions] = useState<CashSession[]>([]);
  const [closedSessions, setClosedSessions] = useState<CashSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOpenSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sessions = await cashSessionRepository.getOpen();
      setOpenSessions(sessions);
    } catch {
      setError('Error loading open sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClosedSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sessions = await cashSessionRepository.getClosed();
      setClosedSessions(sessions);
    } catch {
      setError('Error loading closed sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  const createSession = useCallback(async (
    branchId: number,
    openingBalance: number,
    openedBy: string,
    notes?: string
  ): Promise<CashSession | null> => {
    setLoading(true);
    setError(null);
    try {
      const id = await cashSessionRepository.create({
        branchId,
        openingBalance,
        status: SessionStatus.OPEN,
        openedAt: new Date(),
        openedBy,
        notes,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await fetchOpenSessions();
      return { id: id as number, branchId, openingBalance, status: SessionStatus.OPEN, openedAt: new Date(), openedBy, notes, createdAt: new Date(), updatedAt: new Date() };
    } catch {
      setError('Error creating session');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchOpenSessions]);

  const openSession = useCallback(async (id: number, openingBalance: number) => {
    setLoading(true);
    setError(null);
    try {
      await cashSessionRepository.update(id, { openingBalance, status: SessionStatus.OPEN });
      await fetchOpenSessions();
    } catch {
      setError('Error opening session');
    } finally {
      setLoading(false);
    }
  }, [fetchOpenSessions]);

  const closeSession = useCallback(async (
    id: number,
    closingBalance: number,
    closedBy: string,
    notes?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await cashSessionRepository.closeSession(id, closingBalance, closedBy, notes);
      await fetchOpenSessions();
      await fetchClosedSessions();
    } catch {
      setError('Error closing session');
    }
  }, [fetchOpenSessions, fetchClosedSessions]);

  const getSessionTransactions = useCallback(async (sessionId: number): Promise<Transaction[]> => {
    return await transactionRepository.getBySession(sessionId);
  }, []);

  const calculateSessionTotalsFn = useCallback(async (sessionId: number) => {
    const session = await cashSessionRepository.getById(sessionId);
    if (!session) return null;
    
    const transactions = await transactionRepository.getBySession(sessionId);
    return calculateSessionTotals(session.openingBalance, session.closingBalance || 0, transactions);
  }, []);

  useEffect(() => {
    fetchOpenSessions();
  }, [fetchOpenSessions]);

  return {
    openSessions,
    closedSessions,
    loading,
    error,
    fetchOpenSessions,
    fetchClosedSessions,
    createSession,
    openSession,
    closeSession,
    getSessionTransactions,
    calculateSessionTotals: calculateSessionTotalsFn,
  };
}