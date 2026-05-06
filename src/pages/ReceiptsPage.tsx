import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBranches } from '../hooks/useBranches';
import { useCashSessions } from '../hooks/useCashSessions';
import { receiptRepository } from '../repositories/receiptRepository';
import { receiptTypeRepository } from '../repositories/receiptTypeRepository';
import type { Receipt, ReceiptType } from '../types/database';
import { ReceiptStatus } from '../types/database';

export default function ReceiptsPage() {
  const { t } = useTranslation();
  const { branches } = useBranches();
  const { openSessions } = useCashSessions();
  
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [receiptTypes, setReceiptTypes] = useState<ReceiptType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewDialog, setShowNewDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    receiptTypeId: 0,
    sessionId: 0,
    branchId: 0,
    recipientName: '',
    recipientDocument: '',
    amount: '',
    description: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [receiptList, types] = await Promise.all([
        receiptRepository.getAll(),
        receiptTypeRepository.getActive(),
      ]);
      setReceipts(receiptList);
      setReceiptTypes(types);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.receiptTypeId || !formData.sessionId || !formData.branchId || !formData.amount) return;
    
    const receiptNumber = await receiptRepository.getNextReceiptNumber();
    const now = new Date();
    await receiptRepository.create({
      receiptNumber,
      receiptTypeId: formData.receiptTypeId,
      sessionId: formData.sessionId,
      branchId: formData.branchId,
      status: ReceiptStatus.DRAFT,
      recipientName: formData.recipientName,
      recipientDocument: formData.recipientDocument || undefined,
      amount: parseFloat(formData.amount),
      description: formData.description,
      createdAt: now,
      updatedAt: now,
    });
    
    setShowNewDialog(false);
    setFormData({
      receiptTypeId: 0,
      sessionId: 0,
      branchId: 0,
      recipientName: '',
      recipientDocument: '',
      amount: '',
      description: '',
    });
    loadData();
  };

  const handlePrint = async (receipt: Receipt) => {
    await receiptRepository.markPrinted(receipt.id!);
    loadData();
  };

  const handleDeliver = async (receipt: Receipt) => {
    await receiptRepository.markDelivered(receipt.id!);
    loadData();
  };

  const handleCancel = async (receipt: Receipt) => {
    if (confirm(t('receipt.cancelConfirm') || '¿Cancelar este recibo?')) {
      await receiptRepository.cancel(receipt.id!);
      loadData();
    }
  };

  const getStatusBadge = (status: ReceiptStatus) => {
    const styles = {
      [ReceiptStatus.DRAFT]: 'bg-gray-100 text-gray-800',
      [ReceiptStatus.PRINTED]: 'bg-blue-100 text-blue-800',
      [ReceiptStatus.DELIVERED]: 'bg-green-100 text-green-800',
      [ReceiptStatus.CANCELLED]: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  };

  if (loading && receipts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t('receipt.title')}</h1>
        <button
          onClick={() => setShowNewDialog(true)}
          className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
        >
          {t('receipt.new')}
        </button>
      </div>

      {receipts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {t('receipt.noReceipts')}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">{t('receipt.number')}</th>
                <th className="px-4 py-2 text-left">{t('receipt.recipient')}</th>
                <th className="px-4 py-2 text-left">{t('receipt.amount')}</th>
                <th className="px-4 py-2 text-left">{t('receipt.status')}</th>
                <th className="px-4 py-2 text-left">{t('session.createdAt')}</th>
                <th className="px-4 py-2 text-left">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt) => (
                <tr key={receipt.id} className="border-t">
                  <td className="px-4 py-2">{receipt.receiptNumber}</td>
                  <td className="px-4 py-2">{receipt.recipientName}</td>
                  <td className="px-4 py-2">{formatCurrency(receipt.amount)}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(receipt.status)}`}>
                      {t(`receipt.status.${receipt.status}`)}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(receipt.createdAt).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {receipt.status === ReceiptStatus.DRAFT && (
                      <button
                        onClick={() => handlePrint(receipt)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {t('receipt.print')}
                      </button>
                    )}
                    {receipt.status === ReceiptStatus.PRINTED && (
                      <button
                        onClick={() => handleDeliver(receipt)}
                        className="text-green-600 hover:underline text-sm"
                      >
                        {t('receipt.deliver')}
                      </button>
                    )}
                    {receipt.status !== ReceiptStatus.CANCELLED && receipt.status !== ReceiptStatus.DELIVERED && (
                      <button
                        onClick={() => handleCancel(receipt)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        {t('receipt.cancel')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showNewDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{t('receipt.new')}</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('receipt.type')}</label>
              <select
                value={formData.receiptTypeId}
                onChange={(e) => setFormData({ ...formData, receiptTypeId: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
              >
                <option value={0}>-- {t('receipt.selectType')} --</option>
                {receiptTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('branch.title')}</label>
              <select
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
              >
                <option value={0}>-- {t('inventory.selectBranch')} --</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('session.title')}</label>
              <select
                value={formData.sessionId}
                onChange={(e) => setFormData({ ...formData, sessionId: Number(e.target.value) })}
                className="w-full border rounded px-3 py-2"
              >
                <option value={0}>-- {t('receipt.selectSession')} --</option>
                {openSessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    #{session.id} - {new Date(session.openedAt).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('receipt.recipient')}</label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('receipt.document')}</label>
              <input
                type="text"
                value={formData.recipientDocument}
                onChange={(e) => setFormData({ ...formData, recipientDocument: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('transaction.amount')}</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('transaction.description')}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={!formData.receiptTypeId || !formData.sessionId || !formData.branchId || !formData.amount}
                className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:opacity-50"
              >
                {t('common.save')}
              </button>
              <button
                onClick={() => setShowNewDialog(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}