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
	console.log(isValid);
	isValid = isValid && typeof body.fullName === 'string';
	console.log(isValid);
	isValid = isValid && !!body.fullName.trim();
	console.log(isValid);
	isValid = isValid && typeof body.confirmPassword === 'string';
	console.log(isValid);
	isValid = isValid && !!body.confirmPassword.trim();
	console.log(isValid);
	isValid = isValid && typeof body.gender === 'string';
	console.log(isValid);
	isValid = isValid && !!body.gender.trim();
	console.log(isValid);
	isValid = isValid && genderValues.has(body.gender);
	console.log(isValid);
	isValid = isValid && typeof body.avatar === 'string';
	console.log(isValid);
	isValid = isValid && !!body.avatar.trim();
	console.log(isValid);
	isValid = isValid && validateLogIn(body);
	console.log(isValid);

	return isValid;
};
