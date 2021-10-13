import { Server } from 'socket.io';
import { ExpressPeerServer } from 'peer';

import { createPeerServerListeners } from './groupCallHandler.js';

const socketInit = (server, app) => {
    const socketToRoom = {};
    const rooms = [];
    let admins = [];
    let audiences = [];

    // const peerServer = ExpressPeerServer(server, {
    //     debug: true,
    // });

    // console.log(peerServer, 'peerServer');

    // app.use('/peerjs', peerServer);

    const io = new Server(server, {
        cors: {
            // TODO: will use the provided domain
            origin: ['http://localhost:3000', 'https://campfire.godtribe.com', 'http://staging.godtribe.com'],
            // origin: '*',
            // origin: 'https://godtribe-8f80d.web.app',
            methods: ['GET', 'POST'],
            // credentials: true,
        },
    });

    io.on('connection', (socket) => {
        socket.emit('connection');

        socket.on('join-campfire', (data) => {
            socket.join(data.campfireId);
            if (data.isAdmin) {
                admins.push(data);
            } else {
                audiences.push(data);
            }
            rooms.push(data.campfireId);
            io.sockets.emit('broadcast', {
                audiences,
                admins, 
            });
        });

        socket.on('join-campfire-group', (data) => {
            socket.join(data.campfireId);
            io.to(data.campfireId).emit('receive-join-campfire-group', data);
            if (data.isAdmin) {
                const isExist = admins.find(item => item.campfireId === data.campfireId && item.userId === data.userId);
                if (!isExist) {
                    admins.push(data);
                }
            } else {
                const isExist = audiences.find(item => item.campfireId === data.campfireId && item.userId === data.userId);
                if (!isExist) {
                    audiences.push(data);
                }
            }
            const filterAudiences = audiences.filter(item => item.userId !== data.userId && item.campfireId === data.campfireId);
            const filterAdmins = admins.filter(item => item.userId !== data.userId && item.campfireId === data.campfireId);
            io.to(data.campfireId).emit('broadcast-join', {
                audiences: filterAudiences,
                admins: filterAdmins,
                newUid: data.userId,
            });
        });

        socket.on('disconnect', (data) => {
            let user = null;
            const audience = audiences.find(item => item.socketId === socket.id);
            const admin = admins.find(item => item.socketId === socket.id);
            if (audience) {
                user = audience;
            }
            if (admin) {
                user = admin;
            }
            audiences = audiences.filter(peer => peer.socketId !== socket.id);
            admins = admins.filter(peer => peer.socketId !== socket.id);
            if (user) {
                io.to(user.campfireId).emit('user-leave', {
                    userId: user.userId,
                });
            }
        });

        socket.on('raise-hand', (data) => {
            audiences = audiences.map(item => {
                return item.campfireId === data.campfireId && item.userId === data.userId ? {
                    ...item,
                    isRaising: data.raise,
                } : item
            });
            io.to(data.campfireId).emit('raised-hand', {
                userId: data.userId,
                campfireId: data.campfireId,
                raise: data.raise,
            });
        })

        socket.on('set-user', (data) => {
            const { 
                userId,
                campfireId,
                key,
                speaker,
                moderator,
                menuKey,
            } = data;

            if (speaker || moderator) {
                const audience = audiences.find(
                    (val) => val.userId === userId && val.campfireId === campfireId,
                );

                if (audience) {
                    admins = [
                        ...admins,
                        {
                            ...audience,
                            ...key,
                            isRaising: false,
                        },
                    ];
                } else {
                    admins = admins.map((val) =>
                        val.userId === userId && val.campfireId === campfireId
                            ? {
                                ...val,
                                ...key,
                                isRaising: false,
                            } : val,
                        );
                }

                audiences = audiences.filter(
                    (val) => val.userId !== data.userId && val.campfireId === data.campfireId,
                );

            } else if (menuKey === 'removeSpeaker') {
                const admin = admins.find(
                    (val) => val.userId === userId && val.campfireId === campfireId,
                );
                if (admin) {
                    audiences = [
                        audiences,
                        {
                            ...admin,
                            ...key,
                        },
                    ];
                }
                admins = admins.filter(
                    (val) => val.userId !== userId && val.campfireId === campfireId,
                );
            }
            io.to(data.campfireId).emit('received-set-user', {
                userId,
                campfireId,
                key,
                speaker,
                moderator,
                menuKey,
            });
        })

        socket.on('leave', (data) => {
            socket.leave(data.campfireId);
            audiences = audiences.filter(peer => peer.userId !== data.userId);
            admins = admins.filter(peer => peer.userId !== data.userId);
            io.to(data.campfireId).emit('user-leave', {
                userId: data.userId,
            });
        })
    });
}

export default socketInit;
