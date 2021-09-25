import React from 'react';
import { useClient } from '../client';
import { UserInterface } from './combined/types';

export type UserHooks = {
  useUserAction(): {
    loginUser: (username: string, password: string) => Promise<{} | undefined>;
    fetchCurrentUser: (token: string) => Promise<[] | undefined>;
    fetchRandomTestUser: () => Promise<{
      id: string;
      name: string;
      email: string;
      profileUrl: string;
    }>;
    fetchAllUsers: () => Promise<UserInterface[] | undefined>;
  };
  useUserState: {
    currentUser?: {
      id: string;
      name: string;
      email: string;
      profileUrl: string;
    };
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    setCurrentUser: (currentUser?: {
      id: string;
      name: string;
      email: string;
      profileUrl: string;
      role: any;
      username: string;
    }) => void;
    token: string;
    setToken: (val: string) => void;
    auth: {
      userAuth: boolean;
      token: string;
    };
    setAuth: (auth?: { userAuth: boolean; token: string }) => void;
    activeCampfire: string | null;
    setActiveCampfire: (val: string | null) => void;
    allUsers: UserInterface[];
    setAllUsers: (arr: UserInterface[]) => void;
  };
};

export const UserHooksContext = React.createContext<UserHooks | null>(null);

export const useUserAction: UserHooks['useUserAction'] = () => {
  const client = useClient(UserHooksContext);
  return client.useUserAction();
};

export const useUserState = (): UserHooks['useUserState'] => {
  const client = useClient(UserHooksContext);
  return client.useUserState;
};
