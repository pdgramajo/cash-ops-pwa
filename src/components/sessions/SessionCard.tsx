import { useTranslation } from 'react-i18next';
import type { CashSession } from '../../types/database';
import { formatDateTime, formatCurrency } from '../../utils/formatters';

interface SessionCardProps {
  session: CashSession;
  isOpen: boolean;
  onClick: () => void;
  onClose?: () => void;
}

export function SessionCard({ session, isOpen, onClick, onClose }: SessionCardProps) {
  const { t } = useTranslation();
  
  return (
    <div 
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
        isOpen ? 'border-green-500 bg-green-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className={`text-sm font-medium ${isOpen ? 'text-green-700' : 'text-gray-500'}`}>
              {isOpen ? t('sessionStatus.OPEN') : t('sessionStatus.CLOSED')}
            </span>
          </div>
          <p className="text-lg font-semibold mt-1">
            {t('session.openedAt')}: {formatDateTime(session.openedAt)}
          </p>
          <p className="text-gray-600">
            {t('session.openingBalance')}: {formatCurrency(session.openingBalance)}
          </p>
          {!isOpen && session.closingBalance !== undefined && (
            <p className="text-gray-600">
              {t('session.closingBalance')}: {formatCurrency(session.closingBalance)}
            </p>
          )}
        </div>
        {isOpen && onClose && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-3 py-1 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
          >
            {t('session.close')}
          </button>
        )}
      </div>
    </div>
  );
}