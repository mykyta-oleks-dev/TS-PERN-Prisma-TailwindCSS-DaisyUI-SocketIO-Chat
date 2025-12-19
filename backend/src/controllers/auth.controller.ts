import type { RequestHandler } from 'express';
import { getPrisma } from '../config/db.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signUp: RequestHandler = async (req, res) => {
	const { fullName, username, password, confirmPassword, gender, avatar } =
		req.body;

	if (
		!fullName?.trim() ||
		!username?.trim() ||
		!password?.trim() ||
		!confirmPassword?.trim() ||
		!gender?.trim() ||
		!avatar?.trim()
	) {
		res.status(400).json({
			message: 'Please fill in all the required fields',
		});
		return;
	}

	if (password !== confirmPassword) {
		res.status(400).json({
			message: "Passwords don't match",
		});
		return;
	}

	const prisma = getPrisma();

	const candidate = await prisma.user.findUnique({ where: { username } });
	if (candidate) {
		res.status(409).json({
			message: 'This username is already taken',
		});
		return;
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const user = await prisma.user.create({
			data: {
				username,
				fullName,
				password: hashedPassword,
				gender,
				avatar,
			},
		});

		const token = generateToken(user.id);

		res.cookie('jwt', token, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV !== 'development',
		});

		res.status(201).json({
			message: 'Signed up successfuly',
			user: {
				id: user.id,
				fullName: user.fullName,
				username: user.username,
				avatar: user.avatar,
				gender: user.gender,
			},
		});
	} catch (err: any) {
		res.status(500).json({ message: err?.message ?? 'Unexpected error' });
	}
};

export const logIn: RequestHandler = (req, res) => {
	res.json({ message: 'Logged in successfuly' });
};

export const logOut: RequestHandler = (req, res) => {
	res.json({ message: 'Logged out successfuly' });
};

function generateToken(id: string) {
	const jwtSecret = process.env.JWT_SECRET;

	if (!jwtSecret) {
		throw new Error('JWT_SECRET env variable is not set!');
	}

	return jwt.sign({ sub: id }, jwtSecret, {
		expiresIn: '15d',
	});
}
