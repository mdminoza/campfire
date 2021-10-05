import React from 'react';

import { useClient } from '../client';

export type MediaStreamHooks = {
  useMediaStreamState: {
    setLocalStream: (stream: any) => any;
    localStream: any;
    localStreamError: any;
    setLocalStreamError: (err: any) => any;
    setMyPeerId: (peer: any) => any;
    myPeerId: any;
  };
  getLocalStream: () => any;
  connectWithMyPeer: () => any;
  connectToNewUser: (data: any) => any;
};

export const MediaStreamHooksContext = React.createContext<MediaStreamHooks | null>(
  null,
);

export const useMediaStreamAction = (): MediaStreamHooks => {
  const client = useClient(MediaStreamHooksContext);
  return client;
};
