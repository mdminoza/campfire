import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { MainPage } from '../../components/pages/MainPage';
import { ActivePage } from '../../components/pages/ActivePage';

const UnprotectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/" />} />
    <Route path="/" element={<MainPage />} />
    <Route path="/active/:id" element={<ActivePage />} />
  </Routes>
);

const Navigator = () => (
  <ErrorBoundary fallback={(error) => <div>ERROR!!! {error?.message}</div>}>
    <BrowserRouter>
      <UnprotectedRoutes />
    </BrowserRouter>
  </ErrorBoundary>
);

const RootNavigator = (): React.ReactElement => (
  <React.Suspense fallback={null}>
    <Navigator />
  </React.Suspense>
);

export default RootNavigator;
