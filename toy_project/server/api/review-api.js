const express = require("express");
const router = express.Router();
const Review = require("../model/review");
const Movie = require("../model/movie");
const User = require("../model/user");

// get average score (at amovie): GET /review/score/<movieid:Number>
router.get("/score/:movieid", async (req, res) => {});

// get all review (at a movie): GET /review/<movieid:Number>
router.get("/:movieid", async (req, res) => {
  if (isNaN(Number(req.params.movieid))) {
    res.status(400).send("movieid should be number type");
    return;
  }
  const reviews = await Review.find({ movieid: req.params.movieid }).lean();
  if (reviews.length == 0) {
    res.status(400).send("no such review");
  } else {
    res.json(reviews);
    console.log("all review sended: " + req.params.movieid);
  }
});

// get my review (at a movie): GET /review/<movieid:Number>/<userid:String>
router.get("/:movieid/:userid", async (req, res) => {
  if (isNaN(Number(req.params.movieid))) {
    res.status(400).send("movieid should be number type");
    return;
  }
  const review = await Review.findOne({
    movieid: req.params.movieid,
    userid: req.params.userid,
  }).lean();
  if (!review) {
    res.status(400).send("no such review");
  } else {
    res.json(review);
    console.log("my review sended: " + review.id);
  }
});

// add review: POST /review
router.post("/", async (req, res) => {
  if (!req.body.hasOwnProperty("movieid")) {
    res.status(400).send("movieid parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("userid")) {
    res.status(400).send("userid parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("score")) {
    res.status(400).send("score parameter is empty");
    return;
  }
  if (isNaN(Number(req.body.movieid))) {
    res.status(400).send("movieid should be number type");
    return;
  }
  if (isNaN(Number(req.body.score))) {
    res.status(400).send("score should be number type");
    return;
  }
  const dup = await Review.findOne({
    movieid: req.body.movieid,
    userid: req.body.userid,
  }).lean();
  if (dup) {
    res.status(400).send("review already exists");
    return;
  }
  const review = await Review.create({
    movieid: req.body.movieid,
    userid: req.body.userid,
    score: req.body.score,
    text: req.body.text,
    time: Date.now(),
  });
  res.status(201).json(review);
});

// modify review: PUT /review
router.put("/", async (req, res) => {
  if (!req.body.hasOwnProperty("id")) {
    res.status(400).send("id parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("score")) {
    res.status(400).send("score parameter is empty");
    return;
  }
  if (isNaN(Number(req.body.id))) {
    res.status(400).send("id should be number type");
    return;
  }
  if (isNaN(Number(req.body.score))) {
    res.status(400).send("score should be number type");
    return;
  }
  const review = await Review.findOne({ id: req.body.id }).lean();
  if (!review) {
    res.status(400).send("no such review");
  } else {
    const newReview = await Review.updateOne(
      { id: req.body.id },
      {
        score: req.body.score,
        text: req.body.text,
        time: Date.now(),
      }
    );
    res.status(201).json(newReview);
  }
});

// delete review: DELETE /review/<id:Number>
router.delete("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).send("id should be number type");
    return;
  }
  const review = await Review.findOne({ id: req.params.id }).lean();
  if (!review) {
    res.status(400).send("no such review");
  } else {
    await Review.deleteOne({ id: req.params.id });
    res.status(201).json(review);
    console.log("movie deleted: " + review.id);
  }
});

module.exports = router;
