import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', labelKey: 'nav.sessions' },
  { path: '/reports', labelKey: 'nav.reports' },
  { path: '/receipts', labelKey: 'nav.receipts' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Cash Operations</h1>
          <div className="flex gap-2">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}