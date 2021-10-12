import React from 'react';

import { useClient } from '../client';
import { JoinedParams } from '../../../common/domain/entities/campfire';

export type SocketHooks = {
  useSocketState: {
    setAdmins: (user: []) => any;
    admins: any[];
    setAudiences: (user: []) => any;
    audiences: any[];
    setLocalUser: (user: any) => any;
    localUser: any;
  };
  socketInit: () => any;
  joinCampfire: (user: JoinedParams) => any;
  leaveCampfire: (userId?: string, campfireId?: string) => any;
  raiseHand: (userId: string, campfireId: string, raise: boolean) => any;
  setUserMenu: (
    userId: string,
    campfireId: string,
    key: any,
    speaker: boolean,
    moderator: boolean,
  ) => any;
};

export const SocketHooksContext = React.createContext<SocketHooks | null>(null);

export const useSocketAction = (): SocketHooks => {
  const client = useClient(SocketHooksContext);
  return client;
};
