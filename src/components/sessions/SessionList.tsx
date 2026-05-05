import type { CashSession } from '../../types/database';
import { SessionCard } from './SessionCard';
import { useTranslation } from 'react-i18next';

interface SessionListProps {
  sessions: CashSession[];
  loading: boolean;
  isOpen: boolean;
  onSessionClick: (session: CashSession) => void;
  onCloseSession?: (session: CashSession) => void;
}

export function SessionList({ 
  sessions, 
  loading, 
  isOpen, 
  onSessionClick, 
  onCloseSession 
}: SessionListProps) {
  const { t } = useTranslation();
  
  if (loading && sessions.length === 0) {
    return <div className="p-4 text-gray-500">{t('common.loading')}</div>;
  }

  if (sessions.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        {isOpen ? t('session.noOpenSessions') : t('session.noClosedSessions')}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isOpen={isOpen}
          onClick={() => onSessionClick(session)}
          onClose={onCloseSession ? () => onCloseSession(session) : undefined}
        />
      ))}
    </div>
  );
}