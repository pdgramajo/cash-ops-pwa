import { useState, useCallback, useMemo } from 'react';
import { transactionRepository } from '../repositories/transactionRepository';
import type { Transaction } from '../types/database';
import { TransactionType, TransactionSubType } from '../types/database';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  filterCounts: { all: number; cash: number; transfer: number; expense: number };
  fetchBySession: (sessionId: number) => Promise<void>;
  createTransaction: (data: Omit<Transaction, 'id'>) => Promise<Transaction | null>;
  deleteTransaction: (id: number) => Promise<boolean>;
  getQuickAmounts: () => number[];
}

export function useTransactions(): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filterCounts = useMemo(() => {
    const all = transactions.length;
    const cash = transactions.filter(t => t.subType === TransactionSubType.CASH_IN || t.subType === TransactionSubType.CASH_OUT).length;
    const transfer = transactions.filter(t => t.subType === TransactionSubType.TRANSFER_IN || t.subType === TransactionSubType.TRANSFER_OUT).length;
    const expense = transactions.filter(t => t.type === TransactionType.EXPENSE).length;
    return { all, cash, transfer, expense };
  }, [transactions]);

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const tx of transactions) {
      if (!tx.description.includes('[DELETED]')) {
        if (tx.type === TransactionType.INCOME) income += tx.amount;
        else if (tx.type === TransactionType.EXPENSE) expense += tx.amount;
      }
    }
    return { totalIncome: income, totalExpense: expense, balance: income - expense };
  }, [transactions]);

  const fetchBySession = useCallback(async (sessionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionRepository.getBySession(sessionId);
      const sorted = [...data].sort((a, b) => 
        new Date(b.processedAt).getTime() - new Date(a.processedAt).getTime()
      );
      setTransactions(sorted);
    } catch {
      setError('Error loading transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTransaction = useCallback(async (data: Omit<Transaction, 'id'>): Promise<Transaction | null> => {
    setLoading(true);
    setError(null);
    try {
      const id = await transactionRepository.create(data);
      await fetchBySession(data.sessionId);
      return { ...data, id: id as number };
    } catch {
      setError('Error creating transaction');
      return null;
    }
  }, [fetchBySession]);

  const deleteTransaction = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await transactionRepository.softDelete(id);
      setTransactions(prev => prev.map(t => 
        t.id === id ? { ...t, description: '[DELETED]' } : t
      ));
      return true;
    } catch {
      setError('Error deleting transaction');
      return false;
    }
  }, []);

  const getQuickAmounts = useCallback(() => {
    return [100, 200, 500, 1000, 2000, 5000];
  }, []);

  return {
    transactions,
    loading,
    error,
    totalIncome: totals.totalIncome,
    totalExpense: totals.totalExpense,
    balance: totals.balance,
    filterCounts,
    fetchBySession,
    createTransaction,
    deleteTransaction,
    getQuickAmounts,
  };
}