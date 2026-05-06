import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';

const SessionsPage = lazy(() => import('./pages/SessionsPage'));
const SessionPage = lazy(() => import('./pages/SessionPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const ReceiptsPage = lazy(() => import('./pages/ReceiptsPage'));
const ImportExportPage = lazy(() => import('./pages/ImportExportPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter basename="/Cash-operations-app/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<AppLayout><SessionsPage /></AppLayout>} />
          <Route path="/session/:sessionId" element={<AppLayout><SessionPage /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><ReportsPage /></AppLayout>} />
          <Route path="/receipts" element={<AppLayout><ReceiptsPage /></AppLayout>} />
          <Route path="/import-export" element={<AppLayout><ImportExportPage /></AppLayout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}