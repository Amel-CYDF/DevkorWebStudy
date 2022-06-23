import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";
import { CgUserlane } from "react-icons/cg";
import { Rating } from "react-simple-star-rating";

const ReviewNidLogin = ({ movieId }) => {

const [userid, setUserid] = useState(null);
const [error, setError] = useState(null);
const [myreview, setMyreview] = useState(null);
const [reviews, setReviews] = useState(null);
const [text, setText] = useState("");
const [rating, setRating] = useState(0);
let year, month, date, hour, minute;

const handleRating = (rate) => {
	setRating(rate);
};

const textHandler = (e) => {
	setText(e.target.value);
};

useEffect(() => {
	if (reviews == null) return;
	reviews.forEach((element) => {
	if (element.userid == userid) {
		setMyreview(element);
		setRating(element.score * 10);
		setText(element.text);
	}
	});
}, [reviews]);

useEffect(() => {
	setUserid(sessionStorage.getItem("userid"));

	const fetchReview = async () => {
	try {
		const res = await axios.get("http://localhost:8080/review/" + movieId);
		setReviews(res.data);
	} catch (e) {
		setError(e);
	}
	};

	fetchReview();
}, []);

const addHandler = (e) => {
	e.preventDefault();

	const body = {
	movieid: movieId,
	userid: userid,
	score: rating / 10,
	text: text,
	};
	console.log(body);

	axios
	.post("http://localhost:8080/review", body)
	.then((res) => {
		console.log(res);
		alert("리뷰를 등록하였습니다.");
		location.reload();
	})
	.catch((err) => {
		alert(err.response.data);
	});
};

const delHandler = (e) => {
	e.preventDefault();

	axios
	.delete("http://localhost:8080/review/" + myreview.id)
	.then((res) => {
		console.log(res);
		alert("리뷰가 삭제되었습니다.");
		location.reload();
	})
	.catch((err) => {
		alert(err.response.data);
	});
};

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
		alert("리뷰를 수정하였습니다.");
		location.reload();
	})
	.catch((err) => {
		alert(err.response.data);
	});
};

if (myreview) {
	const wroteDate = new Date(myreview.time);
	year = wroteDate.getFullYear();
	month = wroteDate.getMonth() + 1;
	date = wroteDate.getDate();
	hour = wroteDate.getHours();
	minute = wroteDate.getMinutes();
}

if (error) return <div>ReviewNidLogin.js 에러</div>;

return (
	<div className="container">
	<div className="icon-area">
		{userid ? (
		<CgUserlane size={40} color="#342568" />
		) : (
		<BsPersonCircle size={40} color="#342568" />
		)}
	</div>
	<div className="review-wrap">
		{userid ? (
		<div className="review-loggedin">
			{myreview ? (
			<div className="reviewed">
				<div className="reviewed-info">
				<h3>내가 작성한 리뷰</h3>
				<p>
					({year}년 {month}월 {date}일 {hour}:{minute})
				</p>
				</div>
				<div className="review-input mine">
				<Rating
					allowHalfIcon={true}
					onClick={handleRating}
					ratingValue={rating} /* Available Props */
					initialValue={rating / 2}
					transition={true}
					allowHover={true}
					fillColor="#342568"
				/>
				<input
					type="text"
					className="reviewText"
					placeholder="리뷰를 작성해주세요!"
					value={text}
					onChange={textHandler}
				/>
				</div>
				<div className="btn-group">
				<button onClick={modHandler} id="modify-btn">
					수정하기
				</button>
				<button onClick={delHandler}>삭제하기</button>
				</div>
			</div>
			) : (
			<>
				<div className="review-input">
				<Rating
					allowHalfIcon={true}
					onClick={handleRating}
					ratingValue={rating} /* Available Props */
					initialValue={rating / 2}
					transition={true}
					allowHover={true}
					fillColor="#342568"
				/>
				<input
					type="text"
					className="reviewText"
					placeholder="리뷰를 작성해주세요!"
					value={text}
					onChange={textHandler}
				/>
				</div>
				<div className="btn-group not-reviewed">
				<button onClick={addHandler}>리뷰 작성</button>
				</div>
			</>
			)}
		</div>
		) : (
		<div className="need-login">
			리뷰 작성은{" "}
			<Link href="/login">
			<span>로그인</span>
			</Link>
			이 필요합니다.
		</div>
		)}
	</div>

	<style jsx>{`
		h3,
		p {
		margin: 0;
		}
		.container {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 20px;
		}
		.icon-area {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		}
		.review-wrap {
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		margin-left: 30px;
		border-radius: 4px;
		}
		.need-login {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-weight: 700;
		height: 100px;
		background: #f8f8fa;
		margin-left: 30px;
		margin-right: 30px;
		}
		.need-login span {
		margin-left: 5px;
		color: #342568;
		text-decoration: underline;
		}
		.need-login span:visited {
		color: #342568;
		}
		.need-login span:hover {
		cursor: pointer;
		}
		.review-loggedin {
		height: fit-content;
		padding: 0 30px;
		position: relative;
		}
		.reviewText {
		display: block;
		margin-top: 10px;
		width: 100%;
		height: 130px;
		border: none;
		font-size: 16px;
		border: 2px solid #342568;
		padding: 20px;
		box-sizing: border-box;
		}
		.reviewText:focus {
		outline: none;
		}
		.review-input {
		height: 100%;
		}
		button:hover {
		cursor: pointer;
		}
		.reviewed {
		background: #f8f8fa;
		height: fit-content;
		padding: 20px;
		position: relative;
		}
		.reviewed-info {
		display: flex;
		align-items: flex-end;
		width: fit-content;
		border-bottom: 2px solid #342568;
		}
		.reviewed-info p {
		margin-left: 30px;
		}
		.mine {
		margin-top: 15px;
		}
		.btn-group {
		margin-top: 20px;
		height: 35px;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		}
		.not-reviewed {
		position: absolute;
		right: 30px !important;
		}
		.btn-group button {
		width: 80px;
		height: 35px;
		border: none;
		border-radius: 4px;
		background: #342568;
		color: white;
		}
		#modify-btn {
		margin-right: 10px;
		}
	`}</style>
	</div>
);
};

export default ReviewNidLogin;