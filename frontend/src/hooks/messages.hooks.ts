import { useEffect, useState } from 'react';
import useConversation from '../store/conversation.store';
import { handleError } from '../lib/utils';

const useGetMessages = () => {
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
	}, []);

	return { loading, messages };
};

export default useGetMessages;
