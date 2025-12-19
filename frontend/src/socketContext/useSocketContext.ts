import { use } from 'react';
import { SocketContext, type ISocketContext } from './context';

export const useSocketContext = (): ISocketContext => {
	const context = use(SocketContext);
	if (context === undefined) {
		throw new Error(
			'useSocketContext must be used within a SocketContextProvider'
		);
	}
	return context;
};
