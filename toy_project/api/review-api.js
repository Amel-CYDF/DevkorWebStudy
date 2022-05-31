const express = require('express');
const router = express.Router();
const Review = require('../model/review');

// get average score (at amovie): GET /review/score/<movieid:Number>
router.get('/score/:movieid', async (req, res) => {
	;
});

// get all review (at a movie): GET /review/<movieid:Number>
router.get('/:movieid', async (req, res) => {
	;
});

// get my review (at a movie): GET /review/<movieid:Number>/<userid:String>
router.get('/:movieid/:userid', async (req, res) => {
	;
});

// add review: POST /review
router.post('/', async (req, res) => {
	;
});

// modify review: PUT /review
router.put('/', async (req, res) => {
	;
});

// delete review: DELETE /review/<id:Number>
router.delete('/:id', async (req, res) => {
	;
});

module.exports = router;