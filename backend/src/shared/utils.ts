import type { Request } from 'express';
import { AppError } from '../middlewares/error.middleware.ts';

export const extractUserOrThrow = (req: Request) => {
	const user = req.user;

	if (!user) throw new AppError('User is not attached to request');

	return user;
};
