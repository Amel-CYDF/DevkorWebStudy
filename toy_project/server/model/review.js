const mongo = require("mongoose");
const autoInc = require("mongoose-auto-increment");
autoInc.initialize(mongo.connection);

const ReviewSchema = new mongo.Schema({
  id: { type: Number, required: true, unique: true, index: true },
  movieid: { type: Number, required: true },
  userid: { type: String, required: true },
  score: { type: Number, required: true },
  text: { type: String, required: true },
  time: { type: Date, required: true },
});

ReviewSchema.plugin(autoInc.plugin, {
  model: "Review",
  field: "id",
});

module.exports = mongo.model("Review", ReviewSchema);
