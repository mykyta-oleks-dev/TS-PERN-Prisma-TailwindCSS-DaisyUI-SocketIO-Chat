import express from 'express';
import usersRouter from './users.routes.ts';
import messagesRouter from './messages.routes.ts';
import { protectedRoute } from '../middlewares/auth.middleware.ts';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
	res.json({ message: 'Hello Api', body: req.body });
});

appRouter.use('/users', usersRouter);

appRouter.use('/messages', protectedRoute, messagesRouter);

export default appRouter;
