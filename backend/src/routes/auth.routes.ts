import express from 'express';
import authController from '../controllers/auth.controller.ts';

const authRouter = express.Router();

authRouter.post('/sign-up', authController.signUp);

authRouter.post('/log-in', authController.logIn);

authRouter.post('/log-out', authController.logOut);

export default authRouter;
