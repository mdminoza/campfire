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
    isCampfireEnded: boolean;
    setCampfireEnded: (value: boolean) => boolean;
    muteAll: any;
    setMuteAll: (value: any) => any;
    socketError: any;
    setSocketError: (value: any) => any;
    isKicked: boolean;
    setKicked: (value: boolean) => boolean;
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
    menuKey: string,
  ) => any;
  setUserEmoji: (
    userId: string,
    campfireId: string,
    key: any,
    isAudience: boolean,
  ) => any;
  endCampfire: (campfireId: string) => any;
  onMuteAll: (userId: string, campfireId: string, val: boolean) => any;
  setOnMute: (userId: string, campfireId: string, muted: boolean) => any;
  getLatestStreams: (userId: string, campfireId: string) => any;
  kickMember: (userId: string, campfireId: string) => any;
};

export const SocketHooksContext = React.createContext<SocketHooks | null>(null);

export const useSocketAction = (): SocketHooks => {
  const client = useClient(SocketHooksContext);
  return client;
};
