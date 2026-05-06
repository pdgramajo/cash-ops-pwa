import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { InventoryMovement } from '../../types/database';
import { MovementCard } from './MovementCard';

interface MovementListProps {
  movements: InventoryMovement[];
  loading: boolean;
  onDelete?: (id: number) => void;
}

export function MovementList({ movements, loading, onDelete }: MovementListProps) {
  const { t } = useTranslation();

  const sortedMovements = useMemo(() => 
    [...movements].sort((a, b) => 
      new Date(b.movementDate).getTime() - new Date(a.movementDate).getTime()
    ), [movements]
  );

  if (loading && movements.length === 0) {
    return <div className="p-4 text-gray-500">{t('common.loading')}</div>;
  }

  if (sortedMovements.length === 0) {
    return <div className="p-4 text-gray-500">{t('inventory.noMovements')}</div>;
  }

  return (
    <div className="space-y-2">
      {sortedMovements.map(m => (
        <MovementCard
          key={m.id}
          movement={m}
          onDelete={onDelete ? () => onDelete(m.id!) : undefined}
        />
      ))}
    </div>
  );
}