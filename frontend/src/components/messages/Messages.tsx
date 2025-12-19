import { useAuthContext } from '../../authContext';
import useGetMessages from '../../hooks/messages.hooks';
import type { Conversation } from '../../types/conversation.type';
import Message from './Message';

const Messages = ({ conversation }: { conversation: Conversation }) => {
	const { authUser } = useAuthContext();
	const { loading, messages } = useGetMessages();

	return (
		<div className="px-4 flex-1 overflow-auto">
			{loading && (
				<span className="loading loading-spinner mx-auto my-auto loading-xl"></span>
			)}
			{messages.map((message) => (
				<Message
					key={message.id}
					message={message}
					avatar={
						message.senderId === authUser?.id
							? authUser.avatar
							: conversation.avatar
					}
					fromMe={message.senderId === authUser?.id}
				/>
			))}
		</div>
	);
};
export default Messages;
