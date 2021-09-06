import React from 'react';
import { useClient } from '../client';

export type UserHooks = {
  useUserAction(): {
    loginUser: (username: string, password: string) => Promise<{} | undefined>;
    fetchCurrentUser: () => Promise<[] | undefined>;
    fetchRandomTestUser: () => Promise<{
      id: string;
      name: string;
      email: string;
      profileUrl: string;
    }>;
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
    }) => void;
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
