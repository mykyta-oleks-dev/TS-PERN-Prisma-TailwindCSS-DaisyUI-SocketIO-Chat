import type { RequestHandler } from 'express';

export const signUp: RequestHandler = (req, res) => {
	res.json({ message: 'Signed up successfuly' });
};

export const logIn: RequestHandler = (req, res) => {
	res.json({ message: 'Logged in successfuly' });
};

export const logOut: RequestHandler = (req, res) => {
	res.json({ message: 'Logged out successfuly' });
};
