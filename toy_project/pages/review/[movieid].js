import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

export default function Review() {
const router = useRouter();
const { movieid } = router.query;

const [userid, Setuserid] = useState(null);

const [movie, setMovie] = useState(null);
const [reviews, setReviews] = useState(null);
const [myreview, setMyreview] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const [rating, setRating] = useState(0);
const [text, setText] = useState("");

const [avgrating, setAvgrating] = useState(0);

// rating: out of 100, score: out of 10
// Catch Rating value
const handleRating = (rate) => {
	setRating(rate);
	// other logic
};
const handleAvgrating = (rate) => {
	setavgRating(rate);
	// other logic
};


useEffect(() => {
	Setuserid(sessionStorage.getItem('userid'));
}, [])
useEffect(() => {
	if(reviews == null) return;
	reviews.forEach(element => {
		if(element.userid == userid) {
			setMyreview(element);
			setRating(element.score * 10);
			setText(element.text);
		}
	});
}, [reviews])

useEffect(() => {
	if(movieid == undefined) return;
	const fetchMovie = async () => {
	try {
		//요청이 시작할 때는 error와 movies를 초기화
		setMovie(null);
		setError(null);
		//loading 상태는 true로 바꿔준다.
		setLoading(true);
		let res = await axios.get("http://localhost:8080/movie/" + movieid);
		setMovie(res.data);
		res = await axios.get("http://localhost:8080/review/" + movieid);
		setReviews(res.data);
		res = await axios.get("http://localhost:8080/review/score/" + movieid);
		setAvgrating(res.data);
	} catch (e) {
		setError(e);
	}
	setLoading(false);
	};

	fetchMovie();
}, [movieid]);

if (loading) return <div>로딩중...</div>;
if (error) return <div>에러가 발생했습니다.</div>;
if (!movie) return null;


const textHandler = (e) => {
	setText(e.target.value);
};

const addHandler = (e) => {
	e.preventDefault();

	const body = {
		movieid: movieid,
		userid: userid,
		score: rating / 10,
		text: text,
	};
	console.log(body);

	axios
		.post("http://localhost:8080/review", body)
		.then((res) => {
			console.log(res);
			alert('추가 성공!');
			location.reload();
		})
		.catch(err => {
			alert(err.response.data);
		});
}
const delHandler = (e) => {
	e.preventDefault();

	axios
		.delete("http://localhost:8080/review/" + myreview.id)
		.then((res) => {
			console.log(res);
			alert('삭제 성공!');
			location.reload();
		})
		.catch(err => {
			alert(err.response.data);
		});
}
const modHandler = (e) => {
	e.preventDefault();

	const body = {
		id: myreview.id,
		score: rating / 10,
		text: text,
	};
	console.log(body);

	axios
		.put("http://localhost:8080/review", body)
		.then((res) => {
			console.log(res);
			alert('수정 성공!');
			location.reload();
		})
		.catch(err => {
			alert(err.response.data);
		});
}


return (
	<div>
		<h1>{movie.title}</h1>
		<img src={movie.poster}></img>
		<div>
			평균 별점: {" "}
			<Rating
				readonly={true}
				allowHalfIcon={true}
				initialValue={avgrating / 2}
			/>
			<b>{avgrating.toFixed(2)}점</b>
		</div>
		<div>
			{ userid ? (
				<div class="writereview">
					<p>{userid}님의 리뷰:</p>
					{ myreview ?
						<p>{myreview.time}에 작성한 리뷰</p>
					:
						<p>아직 작성하시지 않았습니다. 지금 작성해보세요!</p>
					}
					<div class="review">
						별점:{" "}
						<Rating
							allowHalfIcon={true}
							onClick={handleRating}
							ratingValue={rating} /* Available Props */
							initialValue={rating / 2}
						/>
						리뷰:{" "}
						<input
							type="text"
							value={text}
							onChange={textHandler}
						></input>
					</div>
					{ myreview ? (
						<div class="buttondiv">
							<button onClick={modHandler}>수정하기</button>
							<button onClick={delHandler}>삭제하기</button>
						</div>
					) : (
						<div class="buttondiv">
							<button onClick={addHandler}>리뷰 작성하기</button>
						</div>
					) }
				</div>
			) : "" }
		</div>
		<ul>
			{reviews.map((review) => (
				<li>
					<p>{review.time}</p>
					<p>{review.userid}님의 리뷰:</p>
					<p>별점: 
						<Rating
							readonly={true}
							allowHalfIcon={true}
							initialValue={review.score / 2}
						/>
					</p>
					<p>리뷰: {review.text}</p>
				</li>
			))}
		</ul>
	</div>
);
}