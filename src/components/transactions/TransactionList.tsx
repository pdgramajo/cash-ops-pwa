import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Transaction } from '../../types/database';
import { TransactionCard } from './TransactionCard';

type FilterType = 'all' | 'cash' | 'transfer' | 'expense';

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filterCounts: { all: number; cash: number; transfer: number; expense: number };
  onDelete?: (id: number) => void;
}

export function TransactionList({
  transactions,
  loading,
  activeFilter,
  onFilterChange,
  filterCounts,
  onDelete,
}: TransactionListProps) {
  const { t } = useTranslation();

  const filteredTransactions = useMemo(() => {
    if (activeFilter === 'all') return transactions;
    if (activeFilter === 'cash') {
      return transactions.filter(tx => 
        tx.subType === 'CASH_IN' || tx.subType === 'CASH_OUT'
      );
    }
    if (activeFilter === 'transfer') {
      return transactions.filter(tx => 
        tx.subType === 'TRANSFER_IN' || tx.subType === 'TRANSFER_OUT'
      );
    }
    return transactions.filter(tx => tx.type === 'EXPENSE');
  }, [transactions, activeFilter]);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('transaction.all') },
    { key: 'cash', label: t('transaction.cash') },
    { key: 'transfer', label: t('transaction.transfer') },
    { key: 'expense', label: t('transaction.expense') },
  ];

  if (loading && transactions.length === 0) {
    return <div className="p-4 text-gray-500">{t('common.loading')}</div>;
  }

  if (filteredTransactions.length === 0) {
    return <div className="p-4 text-gray-500">{t('transaction.noTransactions')}</div>;
  }

  return (
    <div>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeFilter === f.key 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {f.label} ({filterCounts[f.key]})
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filteredTransactions.map(tx => (
          <TransactionCard
            key={tx.id}
            transaction={tx}
            onDelete={onDelete ? () => onDelete(tx.id!) : undefined}
          />
        ))}
      </div>
    </div>
  );
}