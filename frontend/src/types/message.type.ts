export type Message = {
	id: string;
	body: string;
	senderId: string;
	createdAt: string;
	shouldShake?: boolean;
};
