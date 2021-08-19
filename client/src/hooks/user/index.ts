import React from 'react';
import { useClient } from '../client';

export type UserHooks = {
  useUserAction(): {
    fetchCurrentUser: () => Promise<[] | undefined>;
  };
};

export const UserHooksContext = React.createContext<UserHooks | null>(null);

export const useUserAction: UserHooks['useUserAction'] = () => {
  const client = useClient(UserHooksContext);
  return client.useUserAction();
};
