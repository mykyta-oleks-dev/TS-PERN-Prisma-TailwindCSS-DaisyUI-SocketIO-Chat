import express from 'express';
import authController from '../controllers/auth.controller.ts';
import { protectedRoute } from '../middlewares/auth.middleware.ts';

const authRouter = express.Router();

authRouter.post('/sign-up', authController.signUp);

authRouter.post('/log-in', authController.logIn);

authRouter.get('/who-am-i', protectedRoute, authController.whoAmI);

authRouter.delete('/log-out', authController.logOut);

export default authRouter;
