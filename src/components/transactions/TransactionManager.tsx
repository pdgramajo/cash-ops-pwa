import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionList } from './TransactionList';
import { QuickAmounts } from './QuickAmounts';
import { TransactionType, TransactionSubType, RecipientType } from '../../types/database';
import { formatCurrency } from '../../utils/formatters';

type DialogType = 'sale' | 'expense' | 'withdrawal' | null;
type FilterType = 'all' | 'cash' | 'transfer' | 'expense';

interface TransactionManagerProps {
  sessionId: number;
}

export function TransactionManager({ sessionId }: TransactionManagerProps) {
  const { t } = useTranslation();
  const {
    transactions,
    loading,
    error,
    totalIncome,
    totalExpense,
    balance,
    filterCounts,
    fetchBySession,
    createTransaction,
    deleteTransaction,
    getQuickAmounts,
  } = useTransactions();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [dialog, setDialog] = useState<DialogType>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientType, setRecipientType] = useState<RecipientType>(RecipientType.OTHER);
  const [isCashSale, setIsCashSale] = useState(true);
  const [quickAmounts, setQuickAmounts] = useState<number[]>([]);

  useEffect(() => {
    fetchBySession(sessionId);
  }, [sessionId, fetchBySession]);

  useEffect(() => {
    setQuickAmounts(getQuickAmounts());
  }, [sessionId, getQuickAmounts]);

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setRecipientName('');
    setRecipientType(RecipientType.OTHER);
    setIsCashSale(true);
  };

  const handleCreate = async (type: TransactionType, subType: TransactionSubType) => {
    const amountNum = parseFloat(amount) || 0;
    if (amountNum <= 0 || !description.trim()) return;

    await createTransaction({
      sessionId,
      branchId: 1,
      type,
      subType,
      amount: amountNum,
      description: description.trim(),
      recipientName: recipientName.trim() || undefined,
      recipientType: recipientType || undefined,
      processedAt: new Date(),
      processedBy: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    resetForm();
    setDialog(null);
  };

  const handleSale = () => handleCreate(TransactionType.INCOME, isCashSale ? TransactionSubType.CASH_IN : TransactionSubType.TRANSFER_IN);
  const handleExpense = () => handleCreate(TransactionType.EXPENSE, TransactionSubType.CASH_OUT);
  const handleWithdrawal = () => handleCreate(TransactionType.EXPENSE, TransactionSubType.CASH_OUT);

  const renderDialog = () => {
    if (!dialog) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            {dialog === 'sale' && t('transaction.sale')}
            {dialog === 'expense' && t('transaction.expense')}
            {dialog === 'withdrawal' && t('transaction.withdrawal')}
          </h2>

          {dialog === 'sale' && (
            <div className="mb-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setIsCashSale(true)}
                  className={`flex-1 py-2 rounded ${isCashSale ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
                >
                  {t('transaction.cash')}
                </button>
                <button
                  onClick={() => setIsCashSale(false)}
                  className={`flex-1 py-2 rounded ${!isCashSale ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}
                >
                  {t('transaction.transfer')}
                </button>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('transaction.amount')}</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="0.00"
            />
            <QuickAmounts amounts={quickAmounts} onSelect={(val) => setAmount(val)} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('transaction.description')}</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder={t('transaction.descriptionPlaceholder')}
            />
          </div>

          {(dialog === 'expense' || dialog === 'withdrawal') && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('transaction.recipient')}</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={dialog === 'sale' ? handleSale : dialog === 'expense' ? handleExpense : handleWithdrawal}
              className="flex-1 px-4 py-2 bg-primary text-white rounded hover:opacity-90"
            >
              {t('common.save')}
            </button>
            <button
              onClick={() => {
                resetForm();
                setDialog(null);
              }}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              {t('common.cancel')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600">{t('transaction.income')}</p>
          <p className="text-xl font-bold text-green-700">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-sm text-red-600">{t('transaction.expense')}</p>
          <p className="text-xl font-bold text-red-700">{formatCurrency(totalExpense)}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-600">{t('session.difference')}</p>
          <p className="text-xl font-bold text-blue-700">{formatCurrency(balance)}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDialog('sale')}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {t('transaction.sale')}
        </button>
        <button
          onClick={() => setDialog('expense')}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {t('transaction.expense')}
        </button>
        <button
          onClick={() => setDialog('withdrawal')}
          className="flex-1 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          {t('transaction.withdrawal')}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <TransactionList
        transactions={transactions}
        loading={loading}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        filterCounts={filterCounts}
        onDelete={deleteTransaction}
      />

      {renderDialog()}
    </div>
  );
}