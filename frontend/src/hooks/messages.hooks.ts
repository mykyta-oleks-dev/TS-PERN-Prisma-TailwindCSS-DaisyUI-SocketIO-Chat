import { useEffect, useState } from 'react';
import useConversation from '../store/conversation.store';
import { handleError } from '../lib/utils';
import { useSocketContext } from '../socketContext';
import type { Message } from '../types/message.type';

import notificationSound from '../assets/sounds/notification.mp3';

export const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			if (!selectedConversation) return;

			setLoading(true);

			try {
				const res = await fetch(
					`/api/messages/${selectedConversation.id}`
				);
				const data = await res.json();

				if (!res.ok) {
					throw data;
				}

				setMessages(data);
			} catch (err) {
				handleError(err);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversation, setMessages]);

	return { loading, messages };
};

export const useListenMessages = () => {
	const { getSocket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	useEffect(() => {
		const socket = getSocket();

		if (!socket) return;

		socket.on('newMessage', (message: Message) => {
			message.shouldShake = true;

			const sound = new Audio(notificationSound);
			sound.play();

			setMessages([...messages, message]);
		});

		return () => {
			socket.off('newMessage');
		};
	}, [getSocket, messages, setMessages]);
};

export const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessageAction = async (fd: FormData) => {
		const message = fd.get('message');

		if (
			!selectedConversation ||
			typeof message !== 'string' ||
			!message.trim()
		) {
			return;
		}

		setLoading(true);

		try {
			const res = await fetch(
				`/api/messages/send/${selectedConversation.id}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						message,
					}),
				}
			);
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			setMessages([...messages, data]);
		} catch (err) {
			handleError(err);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessageAction, loading };
};
