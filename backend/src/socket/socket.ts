import { Server } from 'socket.io';
import http from 'node:http';
import app from '../app.ts';

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'DELETE'],
	},
});

const userSocketMap: { [key: string]: string } = {};

const getReceiverSocketId = (receiverId: string) => {
	return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
	console.log('User has been connected:', socket.id);

	const userId = socket.handshake.query.userId as string;

	if (userId) userSocketMap[userId] = socket.id;

	io.emit('getOnlineUsers', Object.keys(userSocketMap));

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
		delete userSocketMap[userId];

		io.emit('getOnlineUsers', Object.keys(userSocketMap));
	});
});

export { io, server, getReceiverSocketId };
