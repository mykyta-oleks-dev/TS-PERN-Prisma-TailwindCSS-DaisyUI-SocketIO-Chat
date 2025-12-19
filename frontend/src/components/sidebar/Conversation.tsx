import { useSocketContext } from '../../socketContext';
import useConversation from '../../store/conversation.store';
import type { Conversation as ConversationObject } from '../../types/conversation.type';

const Conversation = ({
	conversation,
}: {
	conversation: ConversationObject;
}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();

	const isSelected = selectedConversation?.id === conversation.id;

	const isOnline = onlineUsers.includes(conversation.id);

	return (
		<>
			<button
				className={`flex gap-2 items-center ${
					isSelected ? 'bg-sky-600' : ''
				} hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
					<div className="w-8 md:w-12 rounded-full">
						<img src={conversation.avatar} alt="user avatar" />
					</div>
				</div>

				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between">
						<p className="font-bold text-gray-200 text-sm md:text-md">
							{conversation.fullName}
						</p>
					</div>
				</div>
			</button>

			<div className="divider my-0 py-0 h-1" />
		</>
	);
};
export default Conversation;
