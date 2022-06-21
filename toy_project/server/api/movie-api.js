const express = require("express");
const router = express.Router();
const Movie = require("../model/movie");

// get all movie: GET /movie
router.get("/", async (req, res) => {
  const movies = await Movie.find({}).lean();
  res.json(movies);
  console.log("all movie info sended");
});

// get movie: GET /movie/<id:Number>
router.get("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).send("id should be number type");
    return;
  }
  const movie = await Movie.findOne({ id: req.params.id }).lean();
  if (!movie) {
    res.status(400).send("no such movie");
  } else {
    res.json(movie);
    console.log("movie info sended: " + movie.title);
  }
});

// add movie: POST /movie
router.post("/", async (req, res) => {
  if (!req.body.hasOwnProperty("title")) {
    res.status(400).send("title parameter is empty");
    return;
  }
  if (!req.body.hasOwnProperty("poster")) {
    res.status(400).send("poster parameter is empty");
    return;
  }
  const movie = await Movie.create({
    title: req.body.title,
    poster: req.body.poster,
    summary: req.body.summary,
  });
  res.status(201).json(movie);
  console.log("movie created: " + movie.id);
});

// delete movie: DELETE /movie/<id:Number>
router.delete("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.status(400).send("id should be number type");
    return;
  }
  const movie = await Movie.findOne({ id: req.params.id }).lean();
  if (!movie) {
    res.status(400).send("no such movie");
  } else {
    await Movie.deleteOne({ id: req.params.id });
    res.status(201).json(movie);
    console.log("movie deleted: " + movie.title);
  }
});

module.exports = router;
