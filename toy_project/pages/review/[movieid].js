import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Head from "next/head";
import Header from "../../src/components/header";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import ReviewNidLogin from "../../src/components/ReviewNidLogin";
import ReviewList from "../../src/components/ReviewList";

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
	setAvgrating(rate);
	// other logic
};


useEffect(() => {
	Setuserid(sessionStorage.getItem('userid'));
}, [])
// useEffect(() => {
// 	if(reviews == null) return;
// 	reviews.forEach(element => {
// 		if(element.userid == userid) {
// 			setMyreview(element);
// 			setRating(element.score * 10);
// 			setText(element.text);
// 		}
// 	});
// }, [reviews])

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
	<div className="container">
		<Head>
			<title>영화정보 | {movie.title}</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Header loginStatus={userid} />

		<main>
			<div className="review-container">
			<div className="movie-info">
				<img src={movie.poster} />
				<div className="info-container">
				<div className="title-wrap">
					<h3 style={{ fontWeight: "700" }}>{movie.title}</h3>
					<h3 id="title-rating">
					<Rating readonly={true} initialValue={avgrating / 2} />{" "}
					<span id="title-rating">{avgrating.toFixed(1)}</span>
					</h3>
				</div>
				<div className="info-wrap">
					<p className="summary">{movie.summary}</p>
				</div>
				</div>
			</div>
			<div className="rating-container">
				<div className="rating-tit">
				<IoChatboxEllipsesOutline size={36} color="#342568" />{" "}
				<span className="emph-wrap">
					<span className="emph">{movie.title}</span>에 대한 이야기를
					나눠보세요!
				</span>
				</div>
				<ReviewNidLogin movieId={movieid} />
				<ReviewList movieId={movieid} />
			</div>
			</div>
		</main>

		<ul>
			{reviews ? (
			reviews.map((review) => (
				<li key={review.userid}>
				<p>{review.time}</p>
				<p>{review.userid}님의 리뷰:</p>
				<p>
					별점:
					<Rating
					readonly={true}
					allowHalfIcon={true}
					initialValue={review.score / 2}
					fillColor="#f70000"
					/>
				</p>
				<p>리뷰: {review.text}</p>
				</li>
			))
			) : (
			<p>그런거없음ㅋㅋ</p>
			)}
		</ul>

		<style jsx>{`
			.container {
			min-height: 100vh;
			width: 100vw;
			box-sizing: border-box;
			}
			.review-container {
			width: 1400px;
			margin: 0 auto;
			}
			h3 {
			font-size: 36px;
			font-weight: 500;
			color: #222;
			vertical-align: middle;
			margin: 0;
			}
			.title-wrap {
			height: 60px;
			border-bottom: 3px solid #241d1e;
			box-sizing: content-box;
			display: flex;
			justify-content: space-between;
			}
			#title-rating {
			color: #6543b1;
			}
			.movie-info {
			display: flex;
			align-items: center;
			width: 100%;
			height: 500px;
			padding-top: 20px;
			box-sizing: content-box;
			}
			.movie-info img {
			width: 280px;
			height: 400px;
			border-radius: 10px;
			}
			.info-container {
			margin-left: 30px;
			height: 400px;
			width: 100%;
			}
			.summary {
			margin: 0;
			white-space: pre-line;
			padding-top: 20px;
			}
			.rating-tit {
			display: flex;
			width: 100%;
			align-items: center;
			}
			.emph-wrap {
			margin-left: 5px;
			font-size: 20px;
			}
			.emph {
			font-weight: 700;
			color: #342568;
			margin-right: 5px;
			font-size: 24px;
			}
		`}</style>

		<style jsx global>{`
			html,
			body {
			padding: 0;
			margin: 0;
			font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
				Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
				sans-serif;
			}
			* {
			box-sizing: border-box;
			}
		`}</style>
	</div>
);
}