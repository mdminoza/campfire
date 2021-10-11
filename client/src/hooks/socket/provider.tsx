/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef } from 'react';
import io from 'socket.io-client';

import { SocketHooksContext } from '.';
import { JoinedParams } from '../../../common/domain/entities/campfire';
import { useMediaStreamAction } from '../mediaStream';

const SocketProvider = (props: any): React.ReactElement => {
  const [admins, setAdmins] = useState([]);
  const [audiences, setAudiences] = useState([]);
  const [localUser, setLocalUser] = useState<any>(null);

  const {
    connectToNewUser,
    connectToUsers,
    leaveCampfire: leaveCampfireCall,
    userLeft,
  } = useMediaStreamAction();

  const socket = useRef<any>();

  const useSocketState = {
    setAdmins,
    admins,
    setAudiences,
    audiences,
    setLocalUser,
    localUser,
  };

  const SERVER = 'https://staging-campfire-api.azurewebsites.net';

  const socketInit = (): any => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    socket.current = io(SERVER);
    if (socket.current) {
      socket.current.on('connection', () => {});

      socket.current.on('receive-join-campfire-group', (data: any) => {
        connectToNewUser(data);
      });

      socket.current.on('broadcast-join', (data: any) => {
        connectToUsers(data);
      });

      socket.current.on('user-leave', userLeft);
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

  const combinedValues = {
    useSocketState,
    socketInit,
    joinCampfire,
    leaveCampfire,
  };

  return <SocketHooksContext.Provider value={combinedValues} {...props} />;
};

export default SocketProvider;
