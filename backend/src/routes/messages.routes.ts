import express from 'express';
import { conversation } from '../controllers/messages.controller.ts';

const messagesRouter = express.Router();

messagesRouter.all('/', conversation);

export default messagesRouter;
