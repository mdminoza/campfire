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

  const { connectToNewUser } = useMediaStreamAction();

  const socket = useRef<any>();

  const useSocketState = {
    setAdmins,
    admins,
    setAudiences,
    audiences,
    setLocalUser,
    localUser,
  };

  const SERVER = 'http://localhost:5000';

  const socketInit = (): any => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    socket.current = io(SERVER);
    if (socket.current) {
      socket.current.on('connection', () => {
        console.log(socket.current.id, 'socket.current connected');
      });

      socket.current.on('join-campfire-group', (data: any) => {
        console.log(data, 'data');
        connectToNewUser(data);
      });

      // socket.current.on('broadcast', (data: any) => {
      //   if (window.location.pathname.includes('active')) {
      //     const filterAdmins = data.admins?.filter(
      //       (val: JoinedParams) => val.socketId !== socket.current.id,
      //     );
      //     const filterAudiences = data.audiences?.filter(
      //       (val: JoinedParams) => val.socketId !== socket.current.id,
      //     );
      //     setAdmins(filterAdmins);
      //     setAudiences(filterAudiences);
      //   }
      // });
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
        socketId: socket.current.id,
      });
    }
  };

  const leaveCampfire = (userId?: string): any => {
    if (socket.current) {
      socket.current.emit('leave', { userId });
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
