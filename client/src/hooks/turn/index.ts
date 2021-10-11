import React from 'react';
import { useClient } from '../client';

export type TurnHooks = {
  useTurnAction(): {
    getTurnCredentials: () => Promise<any>;
  };
};

export const TurnHooksContext = React.createContext<TurnHooks | null>(null);

export const useTurnAction: TurnHooks['useTurnAction'] = () => {
  const client = useClient(TurnHooksContext);
  return client.useTurnAction();
};
