import { getPrisma } from '../config/db.ts';
import bcrypt from 'bcryptjs';
import {
	ConflictError,
	NotFoundError,
} from '../middlewares/error.middleware.ts';
import { Gender } from '../generated/prisma/enums.ts';

class AuthService {
	public async signUp(
		username: string,
		password: string,
		fullName: string,
		gender: Gender,
		avatar: string
	) {
		const prisma = getPrisma();

		const candidate = await prisma.user.findUnique({
			where: { username },
		});
		if (candidate) {
			throw new ConflictError('This username is already taken');
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const user = await prisma.user.create({
			data: {
				username,
				fullName,
				password: hashedPassword,
				gender,
				avatar,
			},
		});

		return user;
	}

	public async logIn(username: string, password: string) {
		const prisma = getPrisma();

		const user = await prisma.user.findUnique({ where: { username } });

		const isCorrect =
			user && (await bcrypt.compare(password, user.password));

		if (!isCorrect) {
			throw new NotFoundError('Incorrect credentials');
		}

		return user;
	}
}

const authService = new AuthService();

export default authService;
