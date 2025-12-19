import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';

let prisma: PrismaClient | undefined;

export const getPrisma = () => {
	if (prisma) return prisma;

	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL env variable is not set');
	}

	const adapter = new PrismaPg({
		connectionString: process.env.DATABASE_URL,
	});

	prisma = new PrismaClient({ adapter });

	return prisma;
};
