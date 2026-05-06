import { useTranslation } from 'react-i18next';
import type { Transaction } from '../../types/database';
import { TransactionType, TransactionSubType } from '../../types/database';
import { formatDateTime, formatCurrency } from '../../utils/formatters';

interface TransactionCardProps {
  transaction: Transaction;
  onDelete?: () => void;
}

export function TransactionCard({ transaction, onDelete }: TransactionCardProps) {
  const { t } = useTranslation();
  
  const isIncome = transaction.type === TransactionType.INCOME;
  const isCash = transaction.subType === TransactionSubType.CASH_IN || transaction.subType === TransactionSubType.CASH_OUT;
  
  const typeColor = isIncome 
    ? 'border-green-200 bg-green-50' 
    : 'border-red-200 bg-red-50';
  
  const amountColor = isIncome ? 'text-green-700' : 'text-red-700';
  
  return (
    <div className={`border-l-4 rounded-r-lg p-3 ${typeColor} ${isCash ? 'border-l-green-500' : 'border-l-purple-500'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{transaction.description}</p>
          <p className="text-sm text-gray-500">
            {formatDateTime(transaction.processedAt)}
          </p>
          {transaction.recipientName && (
            <p className="text-sm text-gray-600">
              {t('transaction.recipient')}: {transaction.recipientName}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className={`font-semibold ${amountColor}`}>
            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
          </p>
          <p className="text-xs text-gray-500">
            {t(`transaction.${isIncome ? 'income' : 'expense'}`)}
          </p>
        </div>
      </div>
      {onDelete && transaction.description !== '[DELETED]' && (
        <button
          onClick={onDelete}
          className="mt-2 text-xs text-red-500 hover:underline"
        >
          {t('common.delete')}
        </button>
      )}
    </div>
  );
}