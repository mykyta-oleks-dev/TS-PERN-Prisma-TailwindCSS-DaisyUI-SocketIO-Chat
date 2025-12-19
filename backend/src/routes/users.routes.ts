import express from 'express';
import usersController from '../controllers/users.controller.ts';
import { protectedRoute } from '../middlewares/auth.middleware.ts';

const usersRouter = express.Router();

usersRouter.post('/auth/sign-up', usersController.signUp);

usersRouter.post('/auth/log-in', usersController.logIn);

usersRouter.get('/who-am-i', protectedRoute, usersController.whoAmI);

usersRouter.delete('/auth/log-out', usersController.logOut);

usersRouter.get('/', protectedRoute, usersController.getUsers);

export default usersRouter;
