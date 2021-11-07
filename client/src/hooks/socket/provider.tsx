/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import { SocketHooksContext } from '.';
import { JoinedParams } from '../../../common/domain/entities/campfire';
import { useMediaStreamAction } from '../mediaStream';

const SocketProvider = (props: any): React.ReactElement => {
  const [admins, setAdmins] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [localUser, setLocalUser] = useState<any>(null);
  const [isCampfireEnded, setCampfireEnded] = useState<boolean>(false);
  const [muteAll, setMuteAll] = useState<any>(null);
  const [socketError, setSocketError] = useState<any>(null);

  const localUserRef = useRef<any>(null);

  const {
    connectToNewUser,
    connectToUsers,
    leaveCampfire: leaveCampfireCall,
    userLeft,
    setRaisedHand,
    setUser,
    setEmojiUser,
    setMute,
    setMuteAllStream,
    setLatestStreams,
  } = useMediaStreamAction();

  const socket = useRef<any>();

  const useSocketState = {
    setAdmins,
    admins,
    setAudiences,
    audiences,
    setLocalUser,
    localUser,
    isCampfireEnded,
    setCampfireEnded,
    muteAll,
    setMuteAll,
    socketError,
    setSocketError,
  };

  const SERVER = 'https://staging-campfire-api.azurewebsites.net';
  // const SERVER = 'http://localhost:5000';

  const socketInit = (): any => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    socket.current = io(SERVER);
    if (socket.current) {
      socket.current.on('connection', () => {});

      socket.current.on('receive-join-campfire-group', (data: any) => {
        if (
          localUserRef.current &&
          localUserRef.current.userId !== data.userId
        ) {
          connectToNewUser(data);
        }
      });

      socket.current.on('broadcast-join', (data: any) => {
        connectToUsers(data);
      });

      socket.current.on('raised-hand', (data: any) => {
        setRaisedHand(data);
      });

      socket.current.on('received-set-user', (data: any) => {
        if (
          localUserRef.current &&
          localUserRef.current.userId === data.userId
        ) {
          const unraised =
            data.moderator || data.speaker ? { isRaising: false } : {};
          const emojis =
            localUserRef.current.isSpeaker !== data.key.isSpeaker
              ? { emoji: '', emojiId: '' }
              : {};
          setLocalUser({
            ...localUserRef.current,
            ...data.key,
            ...unraised,
            ...emojis,
          });
        } else {
          setUser(data);
        }
      });

      socket.current.on('received-set-user-emoji', (data: any) => {
        if (localUserRef.current.userId !== data.userId) {
          console.log(data, 'received emoji');
          setEmojiUser(data);
        }
      });

      socket.current.on('campfire-ended', () => {
        setCampfireEnded(true);
        leaveCampfireCall();
      });

      socket.current.on('mute-all-received', (data: any) => {
        if (localUserRef.current.userId !== data.userId) {
          setMuteAll(data.muted);
          setMuteAllStream({
            userId: data.userId,
            campfireId: data.campfireId,
            muted: data.muted,
          });
        }
      });

      socket.current.on('user-leave', userLeft);

      socket.current.on('connect_error', () => {
        setSocketError('error connection on socket');
      });

      socket.current.on('disconnect', (reason: any) => {
        setSocketError(reason);
      });

      socket.current.on('mute-received', (data: any) => {
        if (localUserRef.current.userId !== data.userId) {
          setMute(data);
        }
      });

      socket.current.on('received-latest-streams', (data: any) => {
        setLatestStreams(data);
      });
    }
  };

  const joinCampfire = (user: JoinedParams): any => {
    if (socket.current) {
      socket.current.emit('join-campfire-group', {
        ...user,
        socketId: socket.current.id,
      });
      setLocalUser({
        ...user,
        isRaising: false,
        socketId: socket.current.id,
      });
    }
  };

  const leaveCampfire = (userId?: string, campfireId?: string): any => {
    if (socket.current) {
      leaveCampfireCall();
      socket.current.emit('leave', { userId, campfireId });
    }
  };

  const raiseHand = (userId: string, campfireId: string, raise: boolean) => {
    if (socket.current) {
      socket.current.emit('raise-hand', {
        userId,
        campfireId,
        socketId: socket.current.id,
        raise,
      });
    }
  };

  const setUserMenu = (
    userId: string,
    campfireId: string,
    key: any,
    speaker: boolean,
    moderator: boolean,
    menuKey: string,
  ) => {
    if (socket.current) {
      socket.current.emit('set-user', {
        userId,
        campfireId,
        socketId: socket.current.id,
        key,
        speaker,
        moderator,
        menuKey,
      });
    }
  };

  const setUserEmoji = (
    userId: string,
    campfireId: string,
    key: any,
    isAudience: boolean,
  ) => {
    if (socket.current) {
      socket.current.emit('set-user-emoji', {
        userId,
        campfireId,
        socketId: socket.current.id,
        key,
        isAudience,
      });
    }
  };

  const endCampfire = (campfireId: string) => {
    if (socket.current) {
      socket.current.emit('ended', {
        campfireId,
        socketId: socket.current.id,
      });
    }
  };

  const onMuteAll = (userId: string, campfireId: string, val: boolean) => {
    if (socket.current) {
      socket.current.emit('mute-all', {
        campfireId,
        socketId: socket.current.id,
        muted: val,
        userId,
      });
      setMuteAllStream({ userId, campfireId, muted: val });
    }
  };

  const setOnMute = (userId: string, campfireId: string, muted: boolean) => {
    if (socket.current) {
      socket.current.emit('mute-user', {
        userId,
        campfireId,
        socketId: socket.current.id,
        muted,
      });
    }
  };

  const getLatestStreams = (userId: string, campfireId: string) => {
    if (socket.current) {
      socket.current.emit('send-latest-streams', {
        userId,
        campfireId,
        socketId: socket.current.id,
      });
    }
  };

  const combinedValues = {
    useSocketState,
    socketInit,
    joinCampfire,
    leaveCampfire,
    raiseHand,
    setUserMenu,
    setUserEmoji,
    endCampfire,
    onMuteAll,
    setOnMute,
    getLatestStreams,
  };

  useEffect(() => {
    localUserRef.current = localUser;
  }, [localUser]);

  return <SocketHooksContext.Provider value={combinedValues} {...props} />;
};

export default SocketProvider;
