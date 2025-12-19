import express from 'express';
import appRouter from './routes/index.ts';
import dotenv from 'dotenv';
import {
	errorHandler,
	notFoundHandler,
} from './middlewares/error.middleware.ts';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
	res.json({ message: 'Hello World', body: req.body });
});

app.use('/api', appRouter);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
