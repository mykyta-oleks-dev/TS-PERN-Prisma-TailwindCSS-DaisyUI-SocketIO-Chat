import { getPrisma } from '../config/db.ts';
import type { User } from '../generated/prisma/client.ts';

class UsersService {
	public async getUsers(user: User) {
		const prisma = getPrisma();

		const users = await prisma.user.findMany({
			where: {
				id: {
					not: user.id,
				},
			},
			select: {
				id: true,
				avatar: true,
				fullName: true,
			},
		});

		return users;
	}
}

const usersService = new UsersService();

export default usersService;
