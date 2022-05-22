const express = require('express');
const mongo = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


mongo.connect('mongodb://localhost:27017');

let db = mongo.connection;

db.on('error', () => {
	console.log('Connection failled!');
})

db.once('open', () => {
	console.log('Connected!');
})

// const UserSchema = new mongoose.Schema({
// 	id: Number,
// 	name: String,
// 	birthday: Date
// });

// const User = mongoose.model("User", UserSchema);


app.listen(8080, () => {
	console.log("listening on 8080");
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/todo.html');
});

app.get('/api/users', (req, res) => {

	console.log('all users sended');
});

app.post('/add', (req, res) => {
	console.log(req.body);
	res.send('전송 완료');
});