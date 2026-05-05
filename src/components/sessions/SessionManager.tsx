import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCashSessions } from '../../hooks/useCashSessions';
import { SessionList } from './SessionList';
import type { CashSession } from '../../types/database';

interface SessionManagerProps {
  onSessionSelect?: (session: CashSession) => void;
}

export function SessionManager({ onSessionSelect }: SessionManagerProps) {
  const { t } = useTranslation();
  const { 
    openSessions, 
    closedSessions, 
    loading, 
    error, 
    fetchOpenSessions, 
    fetchClosedSessions,
    createSession,
    closeSession 
  } = useCashSessions();
  
  const [activeTab, setActiveTab] = useState<'open' | 'closed'>('open');
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CashSession | null>(null);
  const [openingBalance, setOpeningBalance] = useState('0');
  const [closingBalance, setClosingBalance] = useState('0');

  const handleCreateSession = async () => {
    const balance = parseFloat(openingBalance) || 0;
    await createSession(1, balance, 'User'); // branchId = 1, user = User
    setShowNewDialog(false);
    setOpeningBalance('0');
  };

  const handleCloseSession = async () => {
    if (!selectedSession) return;
    const balance = parseFloat(closingBalance) || 0;
    await closeSession(selectedSession.id!, balance, 'User');
    setShowCloseDialog(false);
    setSelectedSession(null);
    setClosingBalance('0');
  };

  const handleSessionClick = (session: CashSession) => {
    onSessionSelect?.(session);
  };

  const handleCloseClick = (session: CashSession) => {
    setSelectedSession(session);
    setClosingBalance(session.openingBalance.toString());
    setShowCloseDialog(true);
  };

  const handleTabChange = (tab: 'open' | 'closed') => {
    setActiveTab(tab);
    if (tab === 'open') {
      fetchOpenSessions();
    } else {
      fetchClosedSessions();
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleTabChange('open')}
          className={`px-4 py-2 rounded ${
            activeTab === 'open' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {t('session.open')}
        </button>
        <button
          onClick={() => handleTabChange('closed')}
          className={`px-4 py-2 rounded ${
            activeTab === 'closed' 
              ? 'bg-gray-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {t('nav.history')}
        </button>
        {activeTab === 'open' && (
          <button
            onClick={() => setShowNewDialog(true)}
            className="ml-auto px-4 py-2 bg-primary text-white rounded hover:opacity-90"
          >
            {t('session.new')}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <SessionList
        sessions={activeTab === 'open' ? openSessions : closedSessions}
        loading={loading}
        isOpen={activeTab === 'open'}
        onSessionClick={handleSessionClick}
        onCloseSession={activeTab === 'open' ? handleCloseClick : undefined}
      />

      {showNewDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{t('session.new')}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('session.openingBalance')}
              </label>
              <input
                type="number"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateSession}
                className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
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

      {showCloseDialog && selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">{t('session.close')}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('session.closingBalance')}
              </label>
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
                onClick={() => {
                  setShowCloseDialog(false);
                  setSelectedSession(null);
                }}
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