// @types/express/index.d.ts
import * as express from 'express';
import { User } from '../../generated/prisma/client.ts';

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
