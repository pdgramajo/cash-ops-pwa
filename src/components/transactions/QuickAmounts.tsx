import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/formatters';

interface QuickAmountsProps {
  amounts: number[];
  onSelect: (amount: string) => void;
}

export function QuickAmounts({ amounts, onSelect }: QuickAmountsProps) {
  const { t } = useTranslation();

  if (amounts.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-sm text-gray-500 mb-2">{t('transaction.quickAmounts')}</p>
      <div className="flex flex-wrap gap-2">
        {amounts.map(amount => (
          <button
            key={amount}
            onClick={() => onSelect(amount.toString())}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
          >
            {formatCurrency(amount)}
          </button>
        ))}
      </div>
    </div>
  );
}