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

export const validateLogIn = (body: any): body is ValidLogInBody => {
	let isValid = typeof body === 'object';
	isValid = isValid && typeof body?.username === 'string';
	isValid = isValid && !!body.username.trim();
	isValid = isValid && typeof body?.password === 'string';
	isValid = isValid && !!body.password.trim();
	return isValid;
};

export const validateSignUp = (body: any): body is ValidSignUpBody => {
	let isValid = typeof body === 'object';
	isValid = isValid && typeof body.fullName === 'string';
	isValid = isValid && !!body.fullName.trim();
	isValid = isValid && typeof body.confirmPassword === 'string';
	isValid = isValid && !!body.confirmPassword.trim();
	isValid = isValid && typeof body.gender === 'string';
	isValid = isValid && !!body.gender.trim();
	isValid = isValid && genderValues.has(body.gender);
	isValid = isValid && typeof body.avatar === 'string';
	isValid = isValid && !!body.avatar.trim();
	isValid = isValid && validateLogIn(body);

	return isValid;
};
