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
    audienceStreams: any;
    setAudienceStreams: (streams: any) => any;
    adminStreams: any;
    setAdminStreams: (streams: any) => any;
    isMediaSupported: boolean;
    setIsMediaSupported: (value: boolean) => any;
    turnServers: any;
    setTurnServers: (value: any) => any;
  };
  getLocalStream: () => any;
  connectWithMyPeer: () => any;
  connectToNewUser: (data: any) => any;
  connectToUsers: (data: any) => any;
  leaveCampfire: () => any;
  setRaisedHand: (data: any) => any;
  userLeft: (data: any) => void;
  setUser: (data: any) => void;
  setMute: (data: any) => void;
  setMuteAllStream: (data: any) => void;
  setEmojiUser: (data: any) => void;
};

export const MediaStreamHooksContext = React.createContext<MediaStreamHooks | null>(
  null,
);

export const useMediaStreamAction = (): MediaStreamHooks => {
  const client = useClient(MediaStreamHooksContext);
  return client;
};
