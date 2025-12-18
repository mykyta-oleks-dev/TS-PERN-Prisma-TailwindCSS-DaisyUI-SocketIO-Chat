import express from 'express';
import { logIn, logOut, signUp } from '../controllers/auth.controller.ts';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);

authRouter.post('/log-in', logIn);

authRouter.post('/log-out', logOut);

export default authRouter;
