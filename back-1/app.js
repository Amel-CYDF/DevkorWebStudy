const express = require('express');
const mongo = require('mongoose');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use('/', router);

app.listen(8080, () => {
	console.log("listening on 8080");
});


mongo.connect('mongodb://localhost:27017')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log(err);
	})


// APIs about User
const UserSchema = new mongo.Schema({
	id: { type: Number, required: true, unique: true, index: true},
	name: {type: String, required: true},
	birthday: {type: Date}
});
const User = mongo.model("User", UserSchema);

const countuser = async() => {
	const users = await User.find({});
	let ret = 0;
	for(const i of users) {
		ret = Math.max(i.id, ret);
	}
	return ret;
}
let usercnt;
Promise.resolve(countuser()).then( val => {usercnt = val+1;});


router.get('/', (req, res) => {
	res.sendFile(__dirname + '/todo.html');
});

router.get('/users', async (req, res) => {
	const users = await User.find({});
	res.json(users);
	// console.log(users);
	console.log('all users sended');
});
router.get('/users/:id', async (req, res) => {
	if(isNaN(Number(req.params.id))) {
		res.status(400).send('invalid user id');
		return;
	}
	const user = await User.findOne({id: req.params.id});
	if(!user) {
		res.status(404).send('User not found');
	}
	else {
		res.json(user);
	}
	// console.log(users);
});
router.post('/users', async (req, res) => {
	if(!req.body.hasOwnProperty('name')) {
		res.status(400).send('Name parameter is empty');
		return;
	}
	if(req.body.hasOwnProperty('birthday')
		&& isNaN(Date.parse(req.body.birthday))) {
			res.status(400).send('birthday must be an date type');
			return;
	}
	const user = await User.create({
		id: usercnt,
		name: req.body.name,
		birthday: req.body.birthday,
	});
	res.status(201).json(user);
	// console.log(user);
	console.log('user created');
	usercnt++;
});
router.delete('/users', async (req, res) => {
	if(!req.body.hasOwnProperty('id')) {
		res.status(400).send('id parameter is empty');
		return;
	}
	if(isNaN(Number(req.body.id))) {
		res.status(400).send('invalid user id');
		return;
	}
	const user = await User.findOne({id: req.body.id});
	const ret = await User.deleteOne({id: req.body.id});
	// { n: 0, ok: 1, deletedCount: 0 }
	// { n: 1, ok: 1, deletedCount: 1 }
	if(!user) {
		res.status(404).send('User not found');
	}
	else {
		res.json(user);
		console.log(ret);
		console.log('erased!');
	}
});

// ?
router.post('/add', (req, res) => {
	console.log(req.body);
	res.send('전송 완료');
});


// APIs about Schedule
const ScheduleSchema = new mongo.Schema({
	id: { type: Number, required: true, unique: true, index: true},
	date: {type: Date, required: true},
	schedule_name: {type: String, required: true, unique: true},
	schedule_detail: {type: String},
});
const Schedule = mongo.model("Schedule", ScheduleSchema);

const countsch = async() => {
	const schs = await Schedule.find({});
	let ret = 0;
	for(const i of schs) {
		ret = Math.max(i.id, ret);
	}
	return ret;
}
let schcnt;
Promise.resolve(countsch()).then( val => {schcnt = val+1;});


router.get('/schedule', async(req, res) => {
	const schs = await Schedule.find({});
	res.json(schs);
});
router.post('/schedule', async (req, res) => {
	const sch = await Schedule.create({
		id: schcnt,
		date: req.body.date,
		schedule_name: req.body.schedule_name,
		schedule_detail: req.body.schedule_detail,
	});
	res.status(201).json(sch);
	// console.log(sch);
	console.log('Schedule created');
	schcnt++;
});
router.put('/schedule', async (req, res) => {
	if(isNaN(Number(req.body.id))) {
		res.status(400).send('invalid user id');
		return;
	}
	if(isNaN(Date.parse(req.body.date))) {
		res.status(400).send('date must be an date type');
		return;
	}
	if(typeof(req.body.schedule_detail) != "string") {
		res.status(400).send('schedule_detail must be string');
		return;
	}
	const sch = await Schedule.findOne({id: req.body.id});
	if(!sch) {
		res.status(404).send('ID not found');
		return;
	}
	const ret = await Schedule.update({id: req.body.id}, {
		date: req.body.date,
		schedule_name: req.body.schedule_name,
		schedule_detail: req.body.schedule_detail,
	});
	res.json(await Schedule.findOne({id: req.body.id}));
	console.log(ret);
	console.log('Schedule updated');
});