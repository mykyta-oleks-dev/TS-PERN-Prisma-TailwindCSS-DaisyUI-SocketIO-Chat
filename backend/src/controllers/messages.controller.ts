import type { RequestHandler } from 'express';

export const conversation: RequestHandler = (req, res) => {
	res.json({ message: 'Conversation' });
};
