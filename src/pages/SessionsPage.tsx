import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SessionManager } from '../components/sessions';
import type { CashSession } from '../types/database';

export default function SessionsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleSessionSelect = (session: CashSession) => {
    navigate(`/session/${session.id}`);
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('session.title')}</h1>
      <SessionManager onSessionSelect={handleSessionSelect} />
    </div>
  );
}