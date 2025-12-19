import type { User } from '../../generated/prisma/client.ts';

export type PublicUser = Omit<User, 'password'>;
