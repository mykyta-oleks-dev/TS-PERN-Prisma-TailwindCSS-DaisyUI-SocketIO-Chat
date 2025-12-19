import { createContext } from 'react';
import type { Socket } from 'socket.io-client';

export interface ISocketContext {
	getSocket: () => Socket | null;
	onlineUsers: string[];
}

export const SocketContext = createContext<ISocketContext | undefined>(
	undefined
);
