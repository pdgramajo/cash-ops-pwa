import { useTranslation } from 'react-i18next';
import type { InventoryMovement } from '../../types/database';
import { InventoryMovementType } from '../../types/database';
import { formatDateTime, formatNumber } from '../../utils/formatters';

interface MovementCardProps {
  movement: InventoryMovement;
  onDelete?: () => void;
}

export function MovementCard({ movement, onDelete }: MovementCardProps) {
  const { t } = useTranslation();
  
  const isIncoming = movement.type === InventoryMovementType.ENTRY;
  const typeColor = isIncoming 
    ? 'border-green-200 bg-green-50' 
    : 'border-orange-200 bg-orange-50';

  return (
    <div className={`border-l-4 rounded-r-lg p-3 ${typeColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{movement.productName}</p>
          <p className="text-sm text-gray-500">
            {movement.productCode}
          </p>
          <p className="text-sm text-gray-600">
            {formatNumber(movement.quantity)} {movement.unit}
          </p>
          <p className="text-sm text-gray-500">
            {formatDateTime(movement.movementDate)}
          </p>
        </div>
        <div className="text-right">
          <p className={`font-semibold ${isIncoming ? 'text-green-700' : 'text-orange-700'}`}>
            {isIncoming ? '+' : '-'}{formatNumber(movement.quantity)}
          </p>
          <p className="text-xs text-gray-500">
            {t(`inventory.${movement.type.toLowerCase()}`)}
          </p>
        </div>
      </div>
      {onDelete && (
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