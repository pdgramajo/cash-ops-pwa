import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCashSessions } from '../hooks/useCashSessions';
import { cashSessionRepository } from '../repositories/cashSessionRepository';
import { TransactionManager } from '../components/transactions/TransactionManager';
import { InventoryManager } from '../components/inventory/InventoryManager';
import type { CashSession } from '../types/database';
import { SessionStatus } from '../types/database';
import { calculateSessionTotals } from '../utils/calculations';

export default function SessionPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { t } = useTranslation();
  const { fetchOpenSessions, fetchClosedSessions, closeSession } = useCashSessions();
  
  const [session, setSession] = useState<CashSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'transactions' | 'inventory'>('transactions');
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [closingBalance, setClosingBalance] = useState('');
  const [totals, setTotals] = useState<{ totalIncome: number; totalExpense: number; difference: number } | null>(null);

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      await fetchOpenSessions();
      await fetchClosedSessions();
      
      const id = parseInt(sessionId);
      const s = await cashSessionRepository.getById(id);
      if (s) {
        setSession(s);
        const calc = await calculateSessionTotals(s.openingBalance, s.closingBalance || 0, []);
        if (calc) {
          setTotals({ totalIncome: calc.totalIncome, totalExpense: calc.totalExpense, difference: calc.difference });
        }
      }
    } catch (e) {
      console.error('Error loading session:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSession = async () => {
    if (!session || !closingBalance) return;
    await closeSession(session.id!, parseFloat(closingBalance), 'User');
    setShowCloseDialog(false);
    window.location.href = '/';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-4">
        <Link to="/" className="text-primary hover:underline">&larr; {t('nav.sessions')}</Link>
        <p className="mt-4">{t('session.title')} no encontrada</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <Link to="/" className="text-primary hover:underline">&larr; {t('nav.sessions')}</Link>
      </div>

      <div className="bg-white border rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold">{t('session.title')} #{session.id}</h1>
            <p className="text-sm text-gray-600">
              {t('session.openedAt')}: {new Date(session.openedAt).toLocaleString('es-AR')}
            </p>
            <p className="text-sm text-gray-600">
              {t('session.openedBy')}: {session.openedBy}
            </p>
          </div>
          <span className={`px-3 py-1 rounded text-sm ${
            session.status === SessionStatus.OPEN ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {t(`sessionStatus.${session.status}`)}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">{t('session.openingBalance')}</p>
            <p className="text-lg font-semibold">{formatCurrency(session.openingBalance)}</p>
          </div>
          {session.closingBalance !== undefined && (
            <>
              <div>
                <p className="text-sm text-gray-600">{t('session.closingBalance')}</p>
                <p className="text-lg font-semibold">{formatCurrency(session.closingBalance)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('session.difference')}</p>
                <p className={`text-lg font-semibold ${(session.closingBalance! - session.openingBalance - (totals?.totalIncome || 0) + (totals?.totalExpense || 0)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency((session.closingBalance! - session.openingBalance - (totals?.totalIncome || 0) + (totals?.totalExpense || 0)))}
                </p>
              </div>
            </>
          )}
        </div>

        {session.status === SessionStatus.OPEN && (
          <button
            onClick={() => setShowCloseDialog(true)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {t('session.close')}
          </button>
        )}
      </div>

      {session.status === SessionStatus.OPEN && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            {t('transaction.title')}
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded ${activeTab === 'inventory' ? 'bg-primary text-white' : 'bg-gray-100'}`}
          >
            {t('inventory.title')}
          </button>
        </div>
      )}

      {session.status === SessionStatus.OPEN ? (
        activeTab === 'transactions' ? (
          <TransactionManager sessionId={session.id!} />
        ) : (
          <InventoryManager sessionId={session.id!} />
        )
      ) : (
        <TransactionManager sessionId={session.id!} />
      )}

      {showCloseDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{t('session.close')}</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('session.closingBalance')}</label>
              <input
                type="number"
                value={closingBalance}
                onChange={(e) => setClosingBalance(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCloseSession}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t('common.confirm')}
              </button>
              <button
                onClick={() => setShowCloseDialog(false)}
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