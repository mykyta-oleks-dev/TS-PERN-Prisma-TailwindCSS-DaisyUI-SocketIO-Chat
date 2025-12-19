import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AppError, BadRequestError } from '../middlewares/error.middleware.ts';
import authService from '../services/auth.service.ts';
import {
	validateLogIn,
	validateSignUp,
} from '../validation/auth.validation.ts';

class AuthController {
	public signUp: RequestHandler = async (req, res) => {
		if (!validateSignUp(req.body)) {
			throw new BadRequestError('Please fill in all the required fields');
		}

		const {
			fullName,
			username,
			password,
			confirmPassword,
			gender,
			avatar,
		} = req.body;

		if (password !== confirmPassword) {
			throw new BadRequestError("Passwords don't match");
		}

		const user = await authService.signUp(
			username,
			password,
			fullName,
			gender,
			avatar
		);

		const token = this.generateToken(user.id);

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
	};

	public logIn: RequestHandler = async (req, res) => {
		if (!validateLogIn(req.body)) {
			res.status(400).json({
				message: 'Please fill in all the required fields',
			});
			return;
		}

		const { username, password } = req.body;

		const user = await authService.logIn(username, password);

		const token = this.generateToken(user.id);

		res.cookie('jwt', token, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV !== 'development',
		});

		res.json({ message: 'Logged in successfuly' });
	};

	logOut: RequestHandler = (req, res) => {
		res.json({ message: 'Logged out successfuly' });
	};

	private generateToken(id: string) {
		const jwtSecret = process.env.JWT_SECRET;

		if (!jwtSecret) {
			throw new AppError('JWT_SECRET env variable is not set!');
		}

		return jwt.sign({ sub: id }, jwtSecret, {
			expiresIn: '15d',
		});
	}
}

const authController = new AuthController();

export default authController;
