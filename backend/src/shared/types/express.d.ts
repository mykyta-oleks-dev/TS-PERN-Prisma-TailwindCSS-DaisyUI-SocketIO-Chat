// @types/express/index.d.ts
import * as express from 'express';
import { PublicUser } from './user.types.ts';

declare global {
	namespace Express {
		interface Request {
			user?: PublicUser;
		}
	}
}
