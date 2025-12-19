import express from 'express';
import messagesController from '../controllers/messages.controller.ts';
import { protectedRoute } from '../middlewares/auth.middleware.ts';

const messagesRouter = express.Router();

messagesRouter.post('/send/:user_id', protectedRoute, messagesController.send);

export default messagesRouter;
