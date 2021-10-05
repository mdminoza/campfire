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
            console.log(data, 'join group');
            io.to(data.campfireId).emit('join-campfire-group', data);
            socket.join(data.campfireId);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            audiences = audiences.filter(peer => peer.socketId !== socket.id);
            admins = admins.filter(peer => peer.socketId !== socket.id);
            io.sockets.emit('broadcast', {
                audiences,
                admins,
            });
        });

        socket.on('leave', (data) => {
            console.log('leave', data);
            audiences = audiences.filter(peer => peer.userId !== data.userId);
            admins = admins.filter(peer => peer.userId !== data.userId);
            io.sockets.emit('broadcast', {
                audiences,
                admins,
            });
        })
    });
}

export default socketInit;
