import { type Ref } from 'react';
import { useAuthContext } from '../../authContext';
import useChatScroll from '../../hooks/chat-scroll.hook';
import { useGetMessages, useListenMessages } from '../../hooks/messages.hooks';
import type { Conversation } from '../../types/conversation.type';
import Message from './Message';

const Messages = ({ conversation }: { conversation: Conversation }) => {
	const { authUser } = useAuthContext();
	const { loading, messages } = useGetMessages();
	const ref = useChatScroll(messages) as Ref<HTMLDivElement>;

	useListenMessages();

	return (
		<div className="px-4 flex-1 overflow-auto" ref={ref} id="messages">
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
