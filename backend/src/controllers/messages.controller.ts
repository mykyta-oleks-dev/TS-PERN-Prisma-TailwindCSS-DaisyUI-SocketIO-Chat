import type { RequestHandler } from 'express';
import { extractUserOrThrow } from '../shared/utils.ts';
import { BadRequestError } from '../middlewares/error.middleware.ts';
import { validateMessage } from '../validation/messages.validation.ts';
import messagesService from '../services/messages.service.ts';

class MessagesController {
	public send: RequestHandler = async (req, res) => {
		if (!validateMessage(req.body)) {
			throw new BadRequestError('No message is sent with the body');
		}

		const sender = extractUserOrThrow(req);

		const receiverId = req.params.user_id;

		const message = await messagesService.send(
			sender,
			receiverId,
			req.body.message
		);

		res.json(message);
	};
}

const messagesController = new MessagesController();

export default messagesController;
