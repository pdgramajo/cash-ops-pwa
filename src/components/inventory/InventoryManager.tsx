import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useInventoryMovements } from '../../hooks/useInventoryMovements';
import { MovementList } from './MovementList';
import { InventoryMovementType, MovementUnit } from '../../types/database';
import { formatNumber } from '../../utils/formatters';

type DialogType = 'incoming' | 'outgoing' | 'transfer' | null;

interface InventoryManagerProps {
  sessionId: number;
}

export function InventoryManager({ sessionId }: InventoryManagerProps) {
  const { t } = useTranslation();
  const {
    movements,
    loading,
    error,
    totalIncoming,
    totalOutgoing,
    fetchBySession,
    createMovement,
    deleteMovement,
  } = useInventoryMovements();

  const [dialog, setDialog] = useState<DialogType>(null);
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<MovementUnit>(MovementUnit.UNIT);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchBySession(sessionId);
  }, [sessionId, fetchBySession]);

  const resetForm = () => {
    setProductCode('');
    setProductName('');
    setQuantity('');
    setUnit(MovementUnit.UNIT);
    setNotes('');
  };

  const getMovementType = (): InventoryMovementType => {
    if (dialog === 'incoming') return InventoryMovementType.ENTRY;
    if (dialog === 'outgoing') return InventoryMovementType.EXIT;
    return InventoryMovementType.TRANSFER;
  };

  const handleCreate = async () => {
    const qty = parseFloat(quantity) || 0;
    if (qty <= 0 || !productCode.trim() || !productName.trim()) return;

    await createMovement({
      sessionId,
      branchId: 1,
      type: getMovementType(),
      productCode: productCode.trim(),
      productName: productName.trim(),
      quantity: qty,
      unit,
      notes: notes.trim() || undefined,
      movementDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    resetForm();
    setDialog(null);
  };

  const renderDialog = () => {
    if (!dialog) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            {dialog === 'incoming' && t('inventory.registerIncoming')}
            {dialog === 'outgoing' && t('inventory.registerOutgoing')}
            {dialog === 'transfer' && t('inventory.registerTransfer')}
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('inventory.productCode')}</label>
            <input
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('inventory.productName')}</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('inventory.quantity')}</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('inventory.unit')}</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as MovementUnit)}
              className="w-full border rounded px-3 py-2"
            >
              {Object.values(MovementUnit).map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{t('transaction.description')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={2}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCreate}
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600">{t('inventory.incoming')}</p>
          <p className="text-xl font-bold text-green-700">{formatNumber(totalIncoming)}</p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <p className="text-sm text-orange-600">{t('inventory.outgoing')}</p>
          <p className="text-xl font-bold text-orange-700">{formatNumber(totalOutgoing)}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDialog('incoming')}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {t('inventory.incoming')}
        </button>
        <button
          onClick={() => setDialog('outgoing')}
          className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          {t('inventory.outgoing')}
        </button>
        <button
          onClick={() => setDialog('transfer')}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('inventory.transfer')}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <MovementList
        movements={movements}
        loading={loading}
        onDelete={deleteMovement}
      />

      {renderDialog()}
    </div>
  );
}