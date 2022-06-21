const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../model/user");

// get all users: GET /user
router.get("/", async (req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
  console.log("all user info sended");
});

// get user: GET /user/<id:String>
router.get("/:id", async (req, res) => {
  const user = await User.findOne({ id: req.params.id }).lean();
  if (!user) {
    res.status(400).send("no such user");
  } else {
    res.json(user);
    console.log("user info sended: " + req.params.id);
  }
});

// add user: POST /user
router.post("/", async (req, res) => {
  if (!req.body.hasOwnProperty("id")) {
    res.status(400).send("id parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("name")) {
    res.status(400).send("name parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("pw")) {
    res.status(400).send("pw parameter is empty");
    return;
  }
  const dup = await User.findOne({ id: req.body.id }).lean();
  // console.log(dup);
  if (dup != null) {
    res.status(400).send("id already exists");
    return;
  }
  const user = await User.create({
    id: req.body.id,
    name: req.body.name,
    pw: req.body.pw,
  });
  res.status(201).json(user);
  // console.log(user);
  console.log("user created: " + req.body.id);
});

// delete user: DELETE /user/<id:String>
router.delete("/:id", async (req, res) => {
  const user = await User.findOne({ id: req.params.id }).lean();
  if (!user) {
    res.status(400).send("no such user");
  } else {
    await User.deleteOne({ id: req.params.id });
    res.status(201).json(user);
    console.log("user deleted: " + req.params.id);
  }
});

// login: POST /user/login
router.post("/login", async (req, res) => {
  if (!req.body.hasOwnProperty("id")) {
    res.status(400).send("id parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("pw")) {
    res.status(400).send("pw parameter is empty");
    return;
  }
  const user = await User.findOne({ id: req.body.id }).lean();
  if (!user) {
    res.status(401).send("id does not exist");
    return;
  }
  bcrypt.compare(req.body.pw, user.pw, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else if (!result) {
      res.status(401).send("pw wrong");
      console.log("login failed: " + req.body.id);
    } else {
      res.json(user);
      console.log("login success: " + req.body.id);
    }
  });
});

module.exports = router;
