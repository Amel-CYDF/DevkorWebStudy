const mongo = require('mongoose');


const MovieSchema = new mongo.Schema({
	id: {type: Number, required: true, unique: true, index: true},
	title: {type: String, required: true},
	poster: {type: String, required: true},
	summary: {type: String}
});

module.exports = mongo.model("Movie", MovieSchema);