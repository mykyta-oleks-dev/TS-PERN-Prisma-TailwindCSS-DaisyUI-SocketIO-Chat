import { Gender } from '../generated/prisma/enums.ts';

type ValidLogInBody = {
	username: string;
	password: string;
};

type ValidSignUpBody = ValidLogInBody & {
	fullName: string;
	confirmPassword: string;
	gender: Gender;
	avatar: string;
};

const genderValues: Set<Gender> = new Set(['male', 'female']);

export const validateLogIn = (body: any): body is ValidLogInBody =>
	typeof body.username === 'string' &&
	!!body.username.trim() &&
	typeof body.password === 'string' &&
	!!body.password.trim();

export const validateSignUp = (body: any): body is ValidSignUpBody =>
	typeof body.fullName === 'string' &&
	!!body.fullName.trim() &&
	typeof body.confirmPassword === 'string' &&
	!!body.confirmPassword.trim() &&
	typeof body.gender === 'string' &&
	!!body.gender.trim() &&
	genderValues.has(body.gender) &&
	typeof body.avatar === 'string' &&
	!!body.avatar.trim() &&
	validateLogIn(body);
