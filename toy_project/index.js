const express = require('express');
const app = express();
const router = express.Router();


const mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(err);
	})


app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./api/user-api'));
app.use(require('./api/review-api'));

app.listen(8080, () => {
	console.log("listening on 8080");
});

app.get('/', (req, res) => {
	res.status(200).send('OK');
});