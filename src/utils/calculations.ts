import type { Transaction } from '../types/database';
import { TransactionType } from '../types/database';

export interface SessionCalculations {
  openingBalance: number;
  closingBalance: number;
  totalIncome: number;
  totalExpense: number;
  expectedBalance: number;
  difference: number;
}

export function calculateSessionTotals(
  openingBalance: number,
  closingBalance: number,
  transactions: Transaction[],
): SessionCalculations {
  let totalIncome = 0;
  let totalExpense = 0;

  for (const tx of transactions) {
    if (tx.type === TransactionType.INCOME) {
      totalIncome += tx.amount;
    } else {
      totalExpense += tx.amount;
    }
  }

  const expectedBalance = openingBalance + totalIncome - totalExpense;
  const difference = closingBalance - expectedBalance;

  return {
    openingBalance,
    closingBalance,
    totalIncome,
    totalExpense,
    expectedBalance,
    difference,
  };
}