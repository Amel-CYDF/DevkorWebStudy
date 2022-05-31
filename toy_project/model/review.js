const express = require('express');
const mongo = require('mongoose');


const ReviewSchema = new mongo.Schema({
	id: {type: Number, required: true, unique: true, index: true},
	movieid: { type: Number, required: true},
	userid: { type: Number, required: true},
	score: {type: String, required: true},
	text: {type: String, required: true},
	time: {type: Date, required: true}
});

module.exports = mongo.model("Review", ReviewSchema);