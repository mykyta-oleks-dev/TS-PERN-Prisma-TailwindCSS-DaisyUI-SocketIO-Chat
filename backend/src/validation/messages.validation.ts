type ValidMessage = {
	message: string;
};

export const validateMessage = (body: any): body is ValidMessage =>
	typeof body === 'object' &&
	typeof body.message === 'string' &&
	!!body.message.trim();
