import express from 'express';
import messagesController from '../controllers/messages.controller.ts';

const messagesRouter = express.Router();

messagesRouter.post('/send/:user_id', messagesController.send);

messagesRouter.get('/:user_id', messagesController.getMessages);

export default messagesRouter;
