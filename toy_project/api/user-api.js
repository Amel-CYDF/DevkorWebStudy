const express = require('express');
const router = express.Router();
const User = require('../model/user');

const url = '/user';

router.get(url, async (req, res) => {
	const user = await User.find({});
	res.json(user);
	console.log('all user info sended');
});
router.post(url, async (req, res) => {
	if(!req.body.hasOwnProperty('id')) {
		res.status(400).send('id parameter is empty');
		return;
	}
	if(!req.body.hasOwnProperty('name')) {
		res.status(400).send('name parameter is empty');
		return;
	}
	if(!req.body.hasOwnProperty('pw')) {
		res.status(400).send('pw parameter is empty');
		return;
	}
	const dup = await User.findOne({id: req.body.id}).lean();
	console.log(dup);
	if(dup != null) {
		res.status(400).send('id already exists');
		return;
	}
	const user = await User.create({
		id: req.body.id,
		name: req.body.name,
		pw: req.body.pw,
	});
	res.status(201).json(user);
	// console.log(user);
	console.log('user created');
});

module.exports = router;