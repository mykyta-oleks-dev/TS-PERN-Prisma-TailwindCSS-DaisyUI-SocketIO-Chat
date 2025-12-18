import express from 'express';
import authRouter from './auth.routes.ts';
import messagesRouter from './messages.routes.ts';

const appRouter = express.Router();

appRouter.get('/', (req, res) => {
	res.json({ message: 'Hello Api', body: req.body });
});

appRouter.use('/auth', authRouter);

appRouter.use('/messages', messagesRouter);

export default appRouter;
