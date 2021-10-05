/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef, useCallback } from 'react';

import { MediaStreamHooksContext } from '.';

const MediaStreamProvider = (props: any): React.ReactElement => {
  const [localStream, setLocalStream] = useState<any>(null);
  const [localStreamError, setLocalStreamError] = useState<any>(null);
  const [myPeerId, setMyPeerId] = useState<any>(null);
  const peerConnection = useRef<any>(null);
  const myPeer = useRef<any>(null);
  const testStream = useRef<any>(null);

  const useMediaStreamState = {
    localStream,
    setLocalStream,
    localStreamError,
    setLocalStreamError,
    setMyPeerId,
    myPeerId,
  };

  const defaultConstraints = {
    video: false,
    audio: true,
  };

  const configuration = {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:13902',
      },
    ],
  };

  const createPeerConnection = (peerStream: any) => {
    peerConnection.current = new RTCPeerConnection(configuration);
    console.log(peerConnection.current, 'peerConnection.current');
    console.log(peerStream, 'peerStream');
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
          console.log('succesfully connected with other peer');
        }
      };
    }
  };

  const connectWithMyPeer = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    myPeer.current = new window.Peer(undefined, {
      path: '/peerjs',
      host: 'localhost',
      port: '5001',
    });
    console.log(myPeer.current, 'myPeer.current');
    myPeer.current.on('open', (id: string) => {
      setMyPeerId(id);
      console.log(id, 'connected to peer server');
    });
    myPeer.current.on('call', (call: any) => {
      if (testStream.current) {
        call.answer(testStream.current);
        call.on('stream', (incomingStream: any) => {
          console.log('stream came');
        });
      }
    });
  };

  const getLocalStream = (): any => {
    navigator.mediaDevices
      .getUserMedia(defaultConstraints)
      .then((stream) => {
        setLocalStream(stream);
        setLocalStreamError(null);
        createPeerConnection(stream);
        testStream.current = stream;
      })
      .catch((err) => {
        setLocalStreamError(err);
      });
  };

  const connectToNewUser = useCallback(
    (data: any) => {
      if (testStream.current) {
        const call = myPeer.current.call(data.peerId, testStream.current);
        call.on('stream', (incomingStream: any) => {
          console.log(incomingStream, 'incomingStream');
          console.log('stream came');
        });
      }
    },
    [localStream],
  );

  const combinedValues = {
    useMediaStreamState,
    getLocalStream,
    connectWithMyPeer,
    connectToNewUser,
  };

  return <MediaStreamHooksContext.Provider value={combinedValues} {...props} />;
};

export default MediaStreamProvider;
