import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { getPrisma } from '../config/db.ts';
import type { PublicUser } from '../shared/types/user.types.ts';
import {
	AppError,
	NotFoundError,
	UnauthorizedError,
} from './error.middleware.ts';

export const protectedRoute: RequestHandler = async (req, _res, next) => {
	const jwtSecret = process.env.JWT_SECRET;

	if (!jwtSecret) {
		throw new AppError('JWT_SECRET env variable is not set!');
	}

	const token = req.cookies.jwt;

	if (!token) {
		throw new UnauthorizedError('Not authenticated');
	}

	const decoded = jwt.verify(token, jwtSecret);

	if (typeof decoded?.sub !== 'string') {
		throw new UnauthorizedError('Invalid token');
	}

	const prisma = getPrisma();

	const user = await prisma.user.findUnique({
		where: { id: decoded.sub },
	});

	if (!user) {
		throw new NotFoundError('User not found');
	}

	req.user = user;

	next();
};
