import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { reportService } from '@/services/reportService';
import { useCashSessions } from '@/hooks/useCashSessions';
import { useTransactions } from '@/hooks/useTransactions';
import { formatDate } from '@/utils/formatters';

type TabType = 'session' | 'daily';

export default function ReportsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TabType>('session');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const { openSessions, closedSessions, fetchOpenSessions, fetchClosedSessions } = useCashSessions();
  const { fetchBySession: fetchTransactions } = useTransactions();

  useEffect(() => {
    fetchOpenSessions();
    fetchClosedSessions();
  }, [fetchOpenSessions, fetchClosedSessions]);

  const allSessions = [...openSessions, ...closedSessions];

  const handleSessionReport = async () => {
    if (!selectedSessionId) return;
    setLoading(true);
    try {
      const session = allSessions.find(s => s.id === selectedSessionId);
      if (!session) return;

      const txs = await fetchTransactions(selectedSessionId);
      const txList = Array.isArray(txs) ? txs : [];

      const doc = await reportService.generateSessionReport({
        session,
        transactions: txList,
        movements: [],
      });

      const filename = `reporte-sesion-${session.id}-${formatDate(new Date())}.pdf`;
      reportService.downloadPDF(doc, filename);
    } finally {
      setLoading(false);
    }
  };

  const handleDailyReport = async () => {
    setLoading(true);
    try {
      const date = new Date(selectedDate);
      const doc = await reportService.generateDailyReport(date, allSessions, new Map());
      const filename = `reporte-diario-${selectedDate}.pdf`;
      reportService.downloadPDF(doc, filename);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('report.title')}</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('session')}
          className={`px-4 py-2 rounded ${
            activeTab === 'session' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {t('report.sessionSummary')}
        </button>
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded ${
            activeTab === 'daily' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {t('report.dailySummary')}
        </button>
      </div>

      {activeTab === 'session' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('report.selectSession')}</label>
          <select
            value={selectedSessionId || ''}
            onChange={(e) => setSelectedSessionId(parseInt(e.target.value) || null)}
            className="w-full max-w-md border rounded px-3 py-2"
          >
            <option value="">{t('report.selectSession')}</option>
            {allSessions.map(session => (
              <option key={session.id} value={session.id}>
                Sesión #{session.id} - {session.status}
              </option>
            ))}
          </select>

          <button
            onClick={handleSessionReport}
            disabled={!selectedSessionId || loading}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('report.generatePdf')}
          </button>
        </div>
      )}

      {activeTab === 'daily' && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('report.selectDate')}</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full max-w-md border rounded px-3 py-2"
          />

          <button
            onClick={handleDailyReport}
            disabled={loading}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('report.generatePdf')}
          </button>
        </div>
      )}
    </div>
  );
}