/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef, useCallback, useEffect } from 'react';

import { MediaStreamHooksContext } from '.';
import { useUserState } from '../user';

const MediaStreamProvider = (props: any): React.ReactElement => {
  const [localStream, setLocalStream] = useState<any>(null);
  const [isMediaSupported, setIsMediaSupported] = useState<boolean>(true);
  const [localStreamError, setLocalStreamError] = useState<any>('');
  const [myPeerId, setMyPeerId] = useState<any>(null);
  const [audienceStreams, setAudienceStreams] = useState<any>([]);
  const [adminStreams, setAdminStreams] = useState<any>([]);
  const [turnServers, setTurnServers] = useState<any>([]);

  // const [myPeerId, setMyPeerId] = useState<any>(null);
  const peerConnection = useRef<any>(null);
  const myPeer = useRef<any>(null);
  const ownLocalStream = useRef<any>(null);

  const adminStreamsRef = useRef<any>([]);
  const audienceStreamsRef = useRef<any>([]);
  const turnServersRef = useRef<any>([]);

  const { currentUser, getCurrentUser } = useUserState();

  const useMediaStreamState = {
    localStream,
    setLocalStream,
    localStreamError,
    setLocalStreamError,
    setMyPeerId,
    myPeerId,
    audienceStreams,
    setAudienceStreams,
    adminStreams,
    setAdminStreams,
    isMediaSupported,
    setIsMediaSupported,
    turnServers,
    setTurnServers,
  };

  const defaultConstraints = {
    video: false,
    audio: true,
  };

  const createPeerConnection = (peerStream: any) => {
    const configuration = {
      iceServers: [
        ...turnServersRef.current,
        {
          url: 'stun:stun.1und1.de:3478',
        },
      ],
      iceTransportPolicy: 'relay',
    };

    peerConnection.current = new RTCPeerConnection(configuration as any);
    if (peerStream) {
      // eslint-disable-next-line no-restricted-syntax
      for (const track of peerStream.getTracks()) {
        peerConnection.current.addTrack(track, peerStream);
      }
      peerConnection.current.ontrack = ({
        streams: [stream],
      }: {
        streams: any;
      }): void => {
        console.log(stream, 'stream');
      };
      // peerConnection.current.onicecandidate = (event) => {};

      peerConnection.current.onconnectionstatechange = () => {
        if (peerConnection.current.connectionState === 'connected') {
          // console.log('succesfully connected with other peer');
        }
      };
    }
  };

  const connectWithMyPeer = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    myPeer.current = new Peer(undefined, {
      // path: '/peerjs',
      // host: 'localhost',
      // port: '5001',
      config: {
        iceServers: [
          ...turnServersRef.current,
          { url: 'stun:stun.1und1.de:3478' },
        ],
      },
    });
    myPeer.current.on('open', (id: string) => {
      setMyPeerId(id);
    });
    myPeer.current.on('call', (call: any) => {
      if (ownLocalStream.current) {
        call.answer(ownLocalStream.current);
        call.on('stream', (incomingStreamCall: any) => {
          const streamsAdmin = adminStreamsRef.current.map((item: any) =>
            item.streamId === incomingStreamCall.id
              ? {
                  ...item,
                  stream: incomingStreamCall,
                }
              : item,
          );
          const streamsAudience = audienceStreamsRef.current.map((item: any) =>
            item.streamId === incomingStreamCall.id
              ? {
                  ...item,
                  stream: incomingStreamCall,
                }
              : item,
          );
          adminStreamsRef.current = streamsAdmin;
          audienceStreamsRef.current = streamsAudience;
          setAdminStreams(streamsAdmin);
          setAudienceStreams(streamsAudience);
        });
      }
    });
  };

  const getLocalStream = (): any => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setIsMediaSupported(false);
      return;
    }

    navigator.mediaDevices
      .getUserMedia(defaultConstraints)
      .then((stream) => {
        setLocalStream(stream);
        setLocalStreamError('');
        createPeerConnection(stream);
        ownLocalStream.current = stream;
      })
      .catch((err) => {
        if (err.message === 'Permission denied') {
          setLocalStreamError(
            'Campfire requires access to your microphone so others on the call can hear you.',
          );
        } else {
          setLocalStreamError(err.message);
        }
      });
  };

  const connectToNewUser = (data: any) => {
    if (ownLocalStream.current) {
      const call = myPeer.current.call(data.peerId, ownLocalStream.current);
      call.on('stream', (incomingStreamCall: any) => {
        if (data.isAdmin) {
          const filterStreams = adminStreamsRef.current.find(
            (adminStream: any) =>
              adminStream?.stream?.id === incomingStreamCall.id,
          );
          if (!filterStreams) {
            adminStreamsRef.current = [
              ...adminStreamsRef.current,
              {
                ...data,
                stream: incomingStreamCall,
              },
            ];
            setAdminStreams(adminStreamsRef.current);
          }
        } else {
          const filterStreams = audienceStreamsRef.current.find(
            (audienceStream: any) =>
              audienceStream?.stream?.id === incomingStreamCall.id,
          );
          if (!filterStreams) {
            audienceStreamsRef.current = [
              ...audienceStreamsRef.current,
              {
                ...data,
                stream: incomingStreamCall,
              },
            ];
            setAudienceStreams(audienceStreamsRef.current);
          }
        }
      });
    }
  };

  const connectToUsers = (data: any) => {
    const user = getCurrentUser();
    if (user.id === data.newUid) {
      audienceStreamsRef.current = data.audiences;
      adminStreamsRef.current = data.admins;
      setAudienceStreams(data.audiences);
      setAdminStreams(data.admins);
    }
  };

  const userLeft = (data: any) => {
    const prevAudiencesData = audienceStreamsRef.current || [];
    const prevAdminsData = adminStreamsRef.current || [];
    const filterAudiences = prevAudiencesData.filter(
      (peer: any) => peer.userId !== data.userId,
    );
    const filterAdmins = prevAdminsData.filter(
      (peer: any) => peer.userId !== data.userId,
    );
    audienceStreamsRef.current = filterAudiences;
    adminStreamsRef.current = filterAdmins;
    setAudienceStreams(filterAudiences);
    setAdminStreams(filterAdmins);
  };

  const leaveCampfire = () => {
    if (myPeer.current) {
      myPeer.current.destroy();
      ownLocalStream.current = null;
      audienceStreamsRef.current = [];
      adminStreamsRef.current = [];
      // connectWithMyPeer();
    }
  };

  const combinedValues = {
    useMediaStreamState,
    getLocalStream,
    connectWithMyPeer,
    connectToNewUser,
    connectToUsers,
    leaveCampfire,
    userLeft,
  };

  useEffect(() => {
    if (turnServers && turnServers.length > 0) {
      turnServersRef.current = turnServers;
    }
  }, [turnServers]);

  return <MediaStreamHooksContext.Provider value={combinedValues} {...props} />;
};

export default MediaStreamProvider;
