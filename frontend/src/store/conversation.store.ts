import { create } from 'zustand';
import type { Conversation } from '../types/conversation.type';
import type { Message } from '../types/message.type';

interface ConversationState {
	selectedConversation: Conversation | null;
	setSelectedConversation: (conversation: Conversation | null) => void;
	messages: Message[];
	setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
	selectedConversation: null,
	setSelectedConversation: (conversation) =>
		set({ selectedConversation: conversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
