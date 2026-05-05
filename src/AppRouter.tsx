import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const SessionsPage = lazy(() => import('./pages/SessionsPage'));
const SessionPage = lazy(() => import('./pages/SessionPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const ReceiptsPage = lazy(() => import('./pages/ReceiptsPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter basename="/Cash-operations-app/">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<SessionsPage />} />
          <Route path="/session/:sessionId" element={<SessionPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/receipts" element={<ReceiptsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}