/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef, useEffect } from 'react';
import { UserHooksContext } from '.';
import * as combinedAuthHooks from './combined';

const UserProvider = (props: any): React.ReactElement => {
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [activeCampfire, setActiveCampfire] = useState(null);
  const [allUsers, setAllUsers] = useState(undefined);
  const currentUserRef = useRef<any>();

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  const getCurrentUser = () => {
    if (currentUserRef.current && currentUserRef.current.id) {
      return currentUserRef.current;
    }
    return null;
  };

  const useUserState = {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    token,
    setToken,
    auth,
    setAuth,
    activeCampfire,
    setActiveCampfire,
    allUsers,
    setAllUsers,
    getCurrentUser,
  };

  const combinedValues = {
    useUserState,
    ...combinedAuthHooks,
  };

  return <UserHooksContext.Provider value={combinedValues} {...props} />;
};

export default UserProvider;
