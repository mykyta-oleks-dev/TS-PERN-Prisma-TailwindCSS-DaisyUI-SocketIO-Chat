import { useState, useEffect, type ReactNode, useRef, useMemo } from 'react';
import { useAuthContext } from '../authContext';
import io, { Socket } from 'socket.io-client';
import { SocketContext } from './context';

const socketURL = import.meta.env.VITE_API_URL;

export const SocketContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const socketRef = useRef<Socket | null>(null);

	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const { authUser, isLoading } = useAuthContext();

	useEffect(() => {
		if (authUser && !isLoading) {
			const newSocket = io(socketURL, {
				query: {
					userId: authUser.id,
				},
			});
			socketRef.current = newSocket;

			newSocket.on('getOnlineUsers', (users: string[]) => {
				setOnlineUsers(users);
			});

			return () => {
				newSocket.close();
				socketRef.current = null;
			};
		} else if (!authUser && !isLoading) {
			if (socketRef.current) {
				socketRef.current.close();
				socketRef.current = null;
			}
		}
	}, [authUser, isLoading]);

	const value = useMemo(
		() => ({
			getSocket: () => socketRef.current,
			onlineUsers,
		}),
		[onlineUsers]
	);

	return (
		<SocketContext.Provider value={value}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketContextProvider;
