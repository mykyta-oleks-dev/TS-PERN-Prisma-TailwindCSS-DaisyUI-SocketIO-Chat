import { getPrisma } from '../config/db.ts';
import type { User } from '../generated/prisma/client.ts';
import { NotFoundError } from '../middlewares/error.middleware.ts';

class MessagesService {
	public async send(sender: User, receiverId: string, body: string) {
		const prisma = getPrisma();

		const receiver = await prisma.user.findUnique({
			where: { id: receiverId },
		});

		if (!receiver) {
			throw new NotFoundError('Message recipient not found');
		}

		const conversation =
			(await prisma.conversation.findFirst({
				where: {
					AND: [
						{ participants: { some: { id: sender.id } } },
						{ participants: { some: { id: receiver.id } } },
					],
				},
			})) ??
			(await prisma.conversation.create({
				data: {
					participants: {
						connect: [{ id: sender.id }, { id: receiver.id }],
					},
				},
			}));

		const message = prisma.message.create({
			data: {
				body,
				senderId: sender.id,
				conversationId: conversation.id,
			},
		});

		return message;
	}
}

const messagesService = new MessagesService();

export default messagesService;
