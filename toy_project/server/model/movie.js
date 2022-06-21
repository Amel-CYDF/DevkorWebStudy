const mongo = require("mongoose");
const autoInc = require("mongoose-auto-increment");
autoInc.initialize(mongo.connection);

const MovieSchema = new mongo.Schema({
  id: { type: Number, required: true, unique: true, index: true },
  title: { type: String, required: true },
  poster: { type: String, required: true },
  summary: { type: String },
});

MovieSchema.plugin(autoInc.plugin, {
  model: "Movie",
  field: "id",
});

module.exports = mongo.model("Movie", MovieSchema);
