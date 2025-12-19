import express from 'express';
import appRouter from './routes/index.ts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	console.log(process.env.DATABASE_URL);
	res.json({ message: 'Hello World', body: req.body });
});

app.use('/api', appRouter);

export default app;
