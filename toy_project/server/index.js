const express = require("express");
const app = express();
const router = express.Router();

// const cookieParser = require('cookie-parser');
// const session = require('express-session');

const mongo = require("mongoose");

mongo
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// res.header("Access-Control-Allow-Credentials", true);
	next();
});

// app.use(cookieParser());
// app.use(session({
// 	key: 'movie',
// 	secret: 'secret',
// 	resave: false,
// 	saveUninitialized: false,
// 	HttpOnly: true,
// 	cookie: {
// 		maxAge: 1000*60*60, // 1 hour
// 		sameSite: "none",
// 		secure: true,
// 	},
// }));
// app.set("trust proxy", 1);

app.use("/user", require("./api/user-api"));
app.use("/review", require("./api/review-api"));
app.use("/movie", require("./api/movie-api"));

app.listen(8080, () => {
  console.log("listening on 8080");
});

app.get("/", (req, res) => {
  res.status(200).send("OK");
});
