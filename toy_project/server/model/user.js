const mongo = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongo.Schema({
  id: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  pw: { type: String, required: true },
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.pw, 10, (err, hash) => {
    if (err) return next(err);
    this.pw = hash;
    next();
  });
});

module.exports = mongo.model("User", UserSchema);
