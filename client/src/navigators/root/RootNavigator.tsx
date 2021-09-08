import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { MainPage } from '../../components/pages/MainPage';
import { ActivePage } from '../../components/pages/ActivePage';
import { LoginPage } from '../../components/pages/LoginPage';

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
    <Route path="/*" element={<Navigate to="/campfire-auth" />} />
    <Route path="/campfire-auth" element={<LoginPage />} />
  </Routes>
);

const Navigator = () => {
  const {
    setCurrentUser,
    setIsLoading,
    token: stateToken,
    // setToken,
  } = useUserState();
  const { fetchRandomTestUser } = useUserAction();

  // TODO: use this to manually logout for testing purposes
  // localStorage.removeItem('access-token');
  // setToken('');

  const token = localStorage.getItem('access-token') || stateToken;

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
