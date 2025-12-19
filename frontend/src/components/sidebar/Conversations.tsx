import { useGetConversations } from '../../hooks/conversations.hooks';
import Conversation from './Conversation';

const Conversations = () => {
	const { conversations, loading } = useGetConversations();

	if (loading) {
		return (
			<span className="loading loading-spinner loading-xl mx-auto my-auto"></span>
		);
	}

	return (
		<div className="py-2 flex flex-col overflow-auto">
			{conversations.map((conversation) => (
				<Conversation
					key={conversation.id}
					conversation={conversation}
				/>
			))}
		</div>
	);
};
export default Conversations;
