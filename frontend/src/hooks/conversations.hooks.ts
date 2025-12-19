import { useEffect, useState } from 'react';
import { type Conversation } from '../types/conversation.type';
import { handleError } from '../lib/utils';

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState<Conversation[]>([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch('/api/users');
				const data = await res.json();

				if (!res.ok) {
					throw data;
				}

				setConversations(data);
			} catch (err) {
				handleError(err);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;
