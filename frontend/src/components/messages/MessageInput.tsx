import { Send } from 'lucide-react';
import { useSendMessage } from '../../hooks/messages.hooks';

const MessageInput = () => {
	const { loading, sendMessageAction } = useSendMessage();

	return (
		<form action={sendMessageAction} className="px-4 mb-3 ">
			<div className="w-full relative">
				<input
					type="text"
					className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
					placeholder="Send a message"
					id="message"
					name="message"
				/>
				<button
					type="submit"
					className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
					disabled={loading}
				>
					<Send className="w-6 h-6 text-white" />
					{loading && (
						<span className="loading loading-spinner loading-md"></span>
					)}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
