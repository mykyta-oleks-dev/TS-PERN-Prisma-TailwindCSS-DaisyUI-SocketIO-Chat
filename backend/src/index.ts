import app from './app.ts';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
		return;
	}

	console.log('Server is listening on port', PORT);
});
