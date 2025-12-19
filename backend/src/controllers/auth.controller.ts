import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { AppError, BadRequestError } from '../middlewares/error.middleware.ts';
import authService from '../services/auth.service.ts';
import {
	validateLogIn,
	validateSignUp,
} from '../validation/auth.validation.ts';
import type { PublicUser } from '../shared/types/user.types.ts';
import { extractUserOrThrow } from '../shared/utils.ts';

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

		const userReturn: PublicUser = {
			id: user.id,
			fullName: user.fullName,
			username: user.username,
			avatar: user.avatar,
			gender: user.gender,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};

		res.status(201).json({
			message: 'Signed up successfuly',
			user: userReturn,
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

	public whoAmI: RequestHandler = async (req, res) => {
		const user = extractUserOrThrow(req);

		res.json(user);
	};

	logOut: RequestHandler = (req, res) => {
		if (req.cookies.jwt) {
			res.cookie('jwt', '', { expires: new Date(0) });
		}

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
