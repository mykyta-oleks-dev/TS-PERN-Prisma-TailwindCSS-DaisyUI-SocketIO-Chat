import type { Message as MessageObject } from '../../types/message.type';

const Message = ({
	message,
	avatar,
	fromMe,
}: {
	message: MessageObject;
	avatar: string;
	fromMe: boolean;
}) => {
	const chatClass = fromMe ? 'chat-end' : 'chat-start';

	const bubbleBg = fromMe ? 'bg-blue-500' : '';
	return (
		<div className={`chat ${chatClass}`}>
			<div className="hidden md:block chat-image avatar">
				<div className="w-6 md:w-10 rounded-full">
					<img
						alt="Tailwind CSS chat bubble component"
						src={avatar}
					/>
				</div>
			</div>
			<p
				className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}
			>
				{message.body}
			</p>
			<span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
				{new Date(message.createdAt).toLocaleTimeString('en-Us', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: false,
				})}
			</span>
		</div>
	);
};
export default Message;
