import express from 'express';

const app = express();

const port = 3000;

app.get('/', (_, res) => {
	res.status(200).json({ msg: 'Hello world' });
});

app.listen(port, () => {
	console.log(`App started at: ${port}`);
});
