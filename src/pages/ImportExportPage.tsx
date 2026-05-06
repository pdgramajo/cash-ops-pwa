import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { exportRepository } from '../services/exportService';
import { importRepository } from '../services/importService';

export default function ImportExportPage() {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportAll = async () => {
    setLoading(true);
    try {
      const json = await exportRepository.exportAll();
      const date = new Date().toISOString().split('T')[0];
      exportRepository.downloadFile(json, `cash-operations-${date}.json`);
      setMessage(t('export.success'));
    } catch (e) {
      setMessage(`${t('export.error')}: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExportBranches = async () => {
    setLoading(true);
    try {
      const json = await exportRepository.exportBranches();
      const date = new Date().toISOString().split('T')[0];
      exportRepository.downloadFile(json, `branches-${date}.json`);
      setMessage(t('export.success'));
    } catch (e) {
      setMessage(`${t('export.error')}: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExportSessions = async () => {
    setLoading(true);
    try {
      const json = await exportRepository.exportSessions();
      const date = new Date().toISOString().split('T')[0];
      exportRepository.downloadFile(json, `sessions-${date}.json`);
      setMessage(t('export.success'));
    } catch (e) {
      setMessage(`${t('export.error')}: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExportTransactions = async () => {
    setLoading(true);
    try {
      const json = await exportRepository.exportTransactions();
      const date = new Date().toISOString().split('T')[0];
      exportRepository.downloadFile(json, `transactions-${date}.json`);
      setMessage(t('export.success'));
    } catch (e) {
      setMessage(`${t('export.error')}: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const content = await importRepository.readFile(file);
      const result = await importRepository.importAll(content);
      setMessage(`${t('import.success')}: ${result.imported} ${t('import.records')}`);
    } catch (err) {
      setMessage(`${t('import.error')}: ${err}`);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('importExport.title')}</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">{message}</div>
      )}

      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">{t('export.title')}</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleExportAll}
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:opacity-50"
            >
              {t('export.all')}
            </button>
            <button
              onClick={handleExportBranches}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:opacity-90 disabled:opacity-50"
            >
              {t('export.branches')}
            </button>
            <button
              onClick={handleExportSessions}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:opacity-90 disabled:opacity-50"
            >
              {t('export.sessions')}
            </button>
            <button
              onClick={handleExportTransactions}
              disabled={loading}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:opacity-90 disabled:opacity-50"
            >
              {t('export.transactions')}
            </button>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">{t('import.title')}</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            disabled={loading}
            className="w-full border rounded px-3 py-2"
          />
          <p className="mt-2 text-sm text-gray-600">{t('import.hint')}</p>
        </div>
      </div>
    </div>
  );
}