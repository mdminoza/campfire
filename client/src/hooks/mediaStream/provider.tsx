/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef, useCallback, useEffect } from 'react';

// import { isSafari } from '../../utils/helpers/common';
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
  // const peerConnection = useRef<any>(null);
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

  // const createPeerConnection = (peerStream: any) => {
  //   const configuration = {
  //     iceServers: [
  //       ...turnServersRef.current,
  //       {
  //         url: 'stun:stun.1und1.de:3478',
  //       },
  //     ],
  //     iceTransportPolicy: 'relay',
  //   };

  // peerConnection.current = new RTCPeerConnection(configuration as any);
  // if (peerStream) {
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const track of peerStream.getTracks()) {
  //     peerConnection.current.addTrack(track, peerStream);
  //   }
  //   peerConnection.current.ontrack = ({
  //     streams: [stream],
  //   }: {
  //     streams: any;
  //   }): void => {
  //     console.log(stream, 'stream');
  //   };
  //   // peerConnection.current.onicecandidate = (event) => {};

  //   peerConnection.current.onconnectionstatechange = () => {
  //     if (peerConnection.current.connectionState === 'connected') {
  //       // console.log('succesfully connected with other peer');
  //     }
  //   };
  // }
  // };

  // const handlePeerDisconnect = () => {
  //   // manually close the peer connections
  //   if (myPeer.current) {
  //     console.log(Object.entries(myPeer.current.connections), 'connections');
  //     // eslint-disable-next-line no-restricted-syntax
  //     for (const [key, value] of Object.entries(myPeer.current.connections)) {
  //       console.log(`${key}: ${value}`);
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       value.forEach((conn, index, array) => {
  //         console.log(
  //           `closing ${conn.connectionId} peerConnection (${index + 1}/${
  //             array.length
  //           })`,
  //           conn.peerConnection,
  //         );
  //         conn.peerConnection.close();

  //         // close it using peerjs methods
  //         if (conn.close) conn.close();
  //       });
  //     }

  // for (const conns in myPeer.current.connections) {
  //   myPeer.current.connections[conns].forEach((conn, index, array) => {
  //     console.log(
  //       `closing ${conn.connectionId} peerConnection (${index + 1}/${
  //         array.length
  //       })`,
  //       conn.peerConnection,
  //     );
  //     conn.peerConnection.close();

  //     // close it using peerjs methods
  //     if (conn.close) conn.close();
  //   });
  // }
  //   }
  // };

  const connectWithMyPeer = () => {
    if (turnServers.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      myPeer.current = new Peer(undefined, {
        // path: '/peerjs',
        // host: 'localhost',
        // port: '5001',
        config: {
          iceServers: [
            // ...turnServersRef.current,
            turnServers?.[1],
            // { url: 'stun:stun.1und1.de:3478' },
          ],
        },
        debug: 3,
      });
    }

    myPeer.current.on('open', (id: string) => {
      console.log(id, 'my peer id');
      setMyPeerId(id);
    });
    // myPeer.current.on('connection', (dataConnection: any) => {
    //   console.log('outer conn event');
    //   dataConnection.on('data', (data: any) => {
    //     console.log(data, 'data connection received');
    //   });

    //   dataConnection.on('open', () => {
    //     dataConnection.send({ stream: ownLocalStream });
    //     console.log('connected');
    //   });
    // });
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
    myPeer.current.on('error', (error: any) => {
      console.log(error.type, 'peer error type');
      console.log(error, 'peer error');
    });
    myPeer.current.on('close', () => {
      console.log('peer is closed!');
    });
    myPeer.current.on('disconnected', () => {
      // myPeer.current.reconnect();
      console.log('peer is disconnected!');
    });
  };

  if (
    myPeer.current &&
    myPeer.current.disconnected &&
    !myPeer.current.destroyed
  ) {
    myPeer.current.reconnect();
  }

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
        // createPeerConnection(stream);
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

      if (data.isAdmin) {
        const filterStreams = adminStreamsRef.current.find(
          (adminStream: any) => adminStream?.userId === data.userId,
        );
        if (!filterStreams) {
          adminStreamsRef.current = [
            ...adminStreamsRef.current,
            {
              ...data,
            },
          ];
          setAdminStreams(adminStreamsRef.current);
        }
      } else {
        const filterStreams = audienceStreamsRef.current.find(
          (audienceStream: any) => audienceStream?.userId === data.userId,
        );
        if (!filterStreams) {
          audienceStreamsRef.current = [
            ...audienceStreamsRef.current,
            {
              ...data,
            },
          ];
          setAudienceStreams(audienceStreamsRef.current);
        }
      }

      call.on('stream', (incomingStreamCall: any) => {
        console.log(incomingStreamCall, 'connect to new user on');
        if (data.isAdmin) {
          const filterStreams = adminStreamsRef.current.find(
            (adminStream: any) =>
              adminStream?.stream?.id === incomingStreamCall.id,
          );
          if (!filterStreams) {
            const newAdminStreams = adminStreamsRef.current.map((val: any) =>
              val.userId === data.userId
                ? {
                    ...val,
                    stream: incomingStreamCall,
                  }
                : {
                    ...val,
                  },
            );
            // adminStreamsRef.current = [
            //   ...adminStreamsRef.current,
            //   {
            //     ...data,
            //     stream: incomingStreamCall,
            //   },
            // ];
            adminStreamsRef.current = newAdminStreams;
            setAdminStreams(adminStreamsRef.current);
          }
        } else {
          const filterStreams = audienceStreamsRef.current.find(
            (audienceStream: any) =>
              audienceStream?.stream?.id === incomingStreamCall.id,
          );
          if (!filterStreams) {
            const newAudienceStreams = audienceStreamsRef.current.map(
              (val: any) =>
                val.userId === data.userId
                  ? {
                      ...val,
                      stream: incomingStreamCall,
                    }
                  : {
                      ...val,
                    },
            );
            // audienceStreamsRef.current = [
            //   ...audienceStreamsRef.current,
            //   {
            //     ...data,
            //     stream: incomingStreamCall,
            //   },
            // ];
            audienceStreamsRef.current = newAudienceStreams;
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

  const setMute = (data: any) => {
    const user = getCurrentUser();
    const audience = audienceStreamsRef.current.find(
      (val: any) =>
        val.userId === data.userId && val.campfireId === data.campfireId,
    );
    if (audience) {
      const newAudienceData = audienceStreamsRef.current.map((val: any) =>
        val.userId === data.userId && val.campfireId === data.campfireId
          ? {
              ...val,
              isMuted: data.muted,
            }
          : val,
      );
      if (user.id !== data.userId) {
        audienceStreamsRef.current = newAudienceData;
        setAudienceStreams(newAudienceData);
      }
    } else {
      const newAdminData = adminStreamsRef.current.map((val: any) =>
        val.userId === data.userId && val.campfireId === data.campfireId
          ? {
              ...val,
              isMuted: data.muted,
            }
          : val,
      );
      if (user.id !== data.userId) {
        adminStreamsRef.current = newAdminData;
        setAdminStreams(newAdminData);
      }
    }
  };

  const setMuteAllStream = (data: any) => {
    const newAudienceData = audienceStreamsRef.current.map((val: any) =>
      val.campfireId === data.campfireId && data.userId !== val.userId
        ? {
            ...val,
            isMuted: data.muted,
          }
        : val,
    );
    const newAdminData = adminStreamsRef.current.map((val: any) =>
      val.campfireId === data.campfireId && data.userId !== val.userId
        ? {
            ...val,
            isMuted: data.muted,
          }
        : val,
    );
    audienceStreamsRef.current = newAudienceData;
    adminStreamsRef.current = newAdminData;
    setAudienceStreams(newAudienceData);
    setAdminStreams(newAdminData);
  };

  const setRaisedHand = (data: any) => {
    const user = getCurrentUser();
    const newAudienceData = audienceStreamsRef.current.map((val: any) =>
      val.userId === data.userId && val.campfireId === data.campfireId
        ? {
            ...val,
            isRaising: data.raise,
          }
        : val,
    );
    if (user.id !== data.userId) {
      audienceStreamsRef.current = newAudienceData;
      setAudienceStreams(newAudienceData);
    }
  };

  const setUser = (data: any) => {
    // const user = getCurrentUser();
    if (data.moderator || data.speaker) {
      let newAdminData: any = [];
      const audience = audienceStreamsRef.current.find(
        (val: any) =>
          val.userId === data.userId && val.campfireId === data.campfireId,
      );

      if (audience) {
        newAdminData = [
          ...adminStreamsRef.current,
          {
            ...audience,
            ...data.key,
            isRaising: false,
            emoji: '',
            emojiId: '',
          },
        ];
      } else {
        newAdminData = adminStreamsRef.current.map((val: any) =>
          val.userId === data.userId && val.campfireId === data.campfireId
            ? {
                ...val,
                ...data.key,
                isRaising: false,
              }
            : val,
        );
      }
      adminStreamsRef.current = newAdminData;
      setAdminStreams(newAdminData);

      const newAudienceData = audienceStreamsRef.current.filter(
        (val: any) =>
          val.userId !== data.userId && val.campfireId === data.campfireId,
      );
      audienceStreamsRef.current = newAudienceData;
      setAudienceStreams(newAudienceData);
    } else if (data.menuKey === 'removeSpeaker') {
      let newAudienceData: any = [];
      const admin = adminStreamsRef.current.find(
        (val: any) =>
          val.userId === data.userId && val.campfireId === data.campfireId,
      );
      if (admin) {
        newAudienceData = [
          ...audienceStreamsRef.current,
          {
            ...admin,
            ...data.key,
            emoji: '',
            emojiId: '',
          },
        ];
      }
      audienceStreamsRef.current = newAudienceData;
      setAudienceStreams(newAudienceData);
      const newAdminData = adminStreamsRef.current.filter(
        (val: any) =>
          val.userId !== data.userId && val.campfireId === data.campfireId,
      );
      adminStreamsRef.current = newAdminData;
      setAdminStreams(newAdminData);
    }
  };

  const setEmojiUser = (data: any) => {
    if (data.isAudience) {
      const newAudienceData = audienceStreamsRef.current.map((val: any) =>
        val.userId === data.userId && val.campfireId === data.campfireId
          ? {
              ...val,
              ...data.key,
            }
          : val,
      );
      audienceStreamsRef.current = newAudienceData;
      setAudienceStreams(newAudienceData);
    } else {
      const newAdminData = adminStreamsRef.current.map((val: any) =>
        val.userId === data.userId && val.campfireId === data.campfireId
          ? {
              ...val,
              ...data.key,
            }
          : val,
      );
      adminStreamsRef.current = newAdminData;
      setAdminStreams(newAdminData);
    }
  };

  const setLatestStreams = (data: any) => {
    const user = getCurrentUser();
    if (user.id === data.userId) {
      audienceStreamsRef.current = data.audiences;
      adminStreamsRef.current = data.admins;
      setAudienceStreams(data.audiences);
      setAdminStreams(data.admins);
    }
  };

  const combinedValues = {
    useMediaStreamState,
    getLocalStream,
    connectWithMyPeer,
    connectToNewUser,
    connectToUsers,
    leaveCampfire,
    setRaisedHand,
    userLeft,
    setUser,
    setEmojiUser,
    setMute,
    setMuteAllStream,
    setLatestStreams,
  };

  useEffect(() => {
    if (turnServers && turnServers.length > 0) {
      turnServersRef.current = turnServers;
    }
  }, [turnServers]);

  return <MediaStreamHooksContext.Provider value={combinedValues} {...props} />;
};

export default MediaStreamProvider;
