/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorBoundary from '../../components/HOCs/ErrorBoundary';
import { Loader } from '../../components/atoms/Loader';
import { MainPage } from '../../components/pages/MainPage';
import { ActivePage } from '../../components/pages/ActivePage';
import { NewActivePage } from '../../components/pages/NewActivePage';
import { LoginPage } from '../../components/pages/LoginPage';

import { useUserState, useUserAction } from '../../hooks/user';
import { useSocketAction } from '../../hooks/socket';
import { UserInterface } from '../../hooks/user/combined/types';
import { ErrorModal } from '../../components/HOCs/ErrorModal';
// import { socketInit } from '../../utils/socketConnection/socketConnection';

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/campfires" />} />
    <Route path="/campfires/active/:id" element={<NewActivePage />} />
    <Route path="/campfires" element={<MainPage />} />
  </Routes>
);

const UnprotectedRoutes = () => (
  <Routes>
    <Route path="/*" element={<Navigate to="/campfires/auth" />} />
    <Route path="/campfires/auth" element={<LoginPage />} />
  </Routes>
);

const Navigator = () => {
  const {
    setCurrentUser,
    setIsLoading,
    token: stateToken,
    setToken,
    allUsers,
    setAllUsers,
  } = useUserState();
  const {
    fetchCurrentUser,
    fetchAllUsers,
    fetchRandomTestUser,
  } = useUserAction();

  const { socketInit, useSocketState } = useSocketAction();

  const { socketError, setSocketError } = useSocketState;

  // TODO: use this to manually logout for testing purposes
  // localStorage.removeItem('access-token');
  // setToken('');

  const token = localStorage.getItem('access-token') || stateToken;
  // const token = 'testtoken';

  const { refetch: refetchCurrentUser, isLoading } = useQuery(
    'current-user',
    () => fetchCurrentUser(token),
    {
      enabled: false,
      onSuccess: (response: {
        avatar: string;
        firstName: string;
        lastName: string;
        role: [];
        id: string;
        email: string;
        username: string;
      }) => {
        const {
          id,
          avatar,
          firstName,
          lastName,
          role,
          email,
          username,
        } = response;
        const user = {
          id,
          name: `${firstName} ${lastName}`,
          email,
          profileUrl: avatar,
          role,
          username,
        };
        setCurrentUser(user);
      },
      onError: () => {
        setCurrentUser(undefined);
        localStorage.removeItem('access-token');
        setToken('');
      },
    },
  );

  // const { refetch: refetchRandomUser, isLoading: isLoadingRandom } = useQuery(
  //   'current-user',
  //   () => fetchRandomTestUser(),
  //   {
  //     enabled: false,
  //     onSuccess: (response: {
  //       profileUrl: string;
  //       name: string;
  //       id: string;
  //       email: string;
  //     }) => {
  //       const { id, profileUrl, name, email } = response;
  //       const user = {
  //         id,
  //         name,
  //         email,
  //         profileUrl,
  //         role: '',
  //         username: '',
  //       };
  //       setCurrentUser(user);
  //     },
  //     onError: () => {
  //       setCurrentUser(undefined);
  //       localStorage.removeItem('access-token');
  //       setToken('');
  //     },
  //   },
  // );

  const handleAllUsers = (arr: UserInterface[] | undefined) => {
    setAllUsers(arr || []);
  };

  const { mutate: getAllUsers } = useMutation(() => fetchAllUsers(), {
    onSuccess: (res) => {
      handleAllUsers(res);
    },
    onError: (error) => {
      console.log('getALl Error: ', error);
    },
  });

  useEffect(() => {
    if (token) {
      refetchCurrentUser();
      getAllUsers();
    } else {
      setCurrentUser(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, setCurrentUser, refetchCurrentUser]);

  const isLoggedIn = !!token;

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    socketInit();
  }, []);

  useEffect(() => {
    if (socketError !== null) {
      ErrorModal(
        'Something went wrong. Please try again.',
        () => {
          setSocketError(null);
          window.location.reload();
        },
        'Try Again',
      );
    }
  }, [setSocketError, socketError]);

  return (
    <ErrorBoundary
      fallback={(error: any) => <div>ERROR!!! {error?.message}</div>}>
      <BrowserRouter>
        {!isLoading ? (
          isLoggedIn ? (
            <ProtectedRoutes />
          ) : (
            <UnprotectedRoutes />
          )
        ) : (
          <Loader />
        )}
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
