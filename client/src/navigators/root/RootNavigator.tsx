import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { Loader } from '../../components/atoms/Loader';
import { MainPage } from '../../components/pages/MainPage';
import { ActivePage } from '../../components/pages/ActivePage';

import { useUserState, useUserAction } from '../../hooks/user';

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/campfires" />} />
    <Route path="/active/:id" element={<ActivePage />} />
    <Route path="/campfires" element={<MainPage />} />
  </Routes>
);

const UnprotectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/" />} />
    <Route path="/" element={<Loader />} />
  </Routes>
);

const Navigator = () => {
  const { setCurrentUser, setIsLoading } = useUserState();
  const { fetchRandomTestUser } = useUserAction();

  const token = localStorage.getItem('currentId');

  const { refetch: fetchCurrentUser, isLoading } = useQuery(
    'current-user',
    () => fetchRandomTestUser(),
    {
      enabled: false,
      onSuccess: (response) => {
        setCurrentUser(response);
      },
      onError: () => {
        setCurrentUser(undefined);
      },
    },
  );

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setCurrentUser(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const isLoggedIn = !!token;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <ErrorBoundary
      fallback={(error: any) => <div>ERROR!!! {error?.message}</div>}>
      <BrowserRouter>
        {!isLoading &&
          (isLoggedIn ? <ProtectedRoutes /> : <UnprotectedRoutes />)}
      </BrowserRouter>
    </ErrorBoundary>
  );
};

const RootNavigator = (): React.ReactElement => (
  <React.Suspense fallback={null}>
    <Navigator />
  </React.Suspense>
);

export default RootNavigator;
