import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Col, Spin } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { MainPage } from '../../components/pages/MainPage';
import { ActivePage } from '../../components/pages/ActivePage';

import { useUserState, useUserAction } from '../../hooks/user';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`;

const LoadingScreen = () => (
  <LoaderWrapper>
    <Spin size="large" />
  </LoaderWrapper>
);

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/main" />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/active/:id" element={<ActivePage />} />
  </Routes>
);

const UnprotectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/" />} />
    <Route path="/" element={<LoadingScreen />} />
  </Routes>
);

const Navigator = () => {
  const { setCurrentUser, setIsLoading, currentUser } = useUserState();
  const { fetchRandomTestUser } = useUserAction();

  const currentId = currentUser?.id;

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
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  return (
    <ErrorBoundary fallback={(error) => <div>ERROR!!! {error?.message}</div>}>
      <BrowserRouter>
        {currentId && !isLoading ? <ProtectedRoutes /> : <UnprotectedRoutes />}
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
