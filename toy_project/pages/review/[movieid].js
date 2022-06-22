import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

	const [myscore, setMyscore] = useState(null);
	const [mytext, setMytext] = useState(null);
	const [score, setScore] = useState(null);
	const [text, setText] = useState(null);

	useEffect(() => {
		Setuserid(sessionStorage.getItem('userid'));
	}, [])
	useEffect(() => {
		if(reviews == null) return;
		reviews.forEach(element => {
			if(element.userid == userid) {
				setMyreview(element);
				setMyscore(element.score);
				setMytext(element.text);
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


  const scoreHandler = (e) => {
	setScore(e.target.value);
  };
  const textHandler = (e) => {
	setText(e.target.value);
  };

  const addHandler = (e) => {
	e.preventDefault();

	const body = {
		movieid: movieid,
		userid: userid,
		score: score,
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

  const myscoreHandler = (e) => {
	setMyscore(e.target.value);
  };
  const mytextHandler = (e) => {
	setMytext(e.target.value);
  };
  const modHandler = (e) => {
	e.preventDefault();

	const body = {
		id: myreview.id,
		score: myscore,
		text: mytext,
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
			{ userid ? (
				<div>
				{ myreview ? (
					<div>
						<div class="myreivew">
							<p>{myreview.time}</p>
							<p>{myreview.userid}님의 리뷰:</p>
							별점: <input type="text" value={myscore} onChange={myscoreHandler}></input>
							리뷰: <input type="text" value={mytext} onChange={mytextHandler}></input>
						</div>
						<button onClick={modHandler}>수정하기</button>
						<button onClick={delHandler}>삭제하기</button>
					</div>
				) : (
					<div>
						<input type="text" placeholder="점수" value={score} onChange={scoreHandler}></input>
						<input type="text" placeholder="내용" value={text} onChange={textHandler}></input>
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
					<p>별점: {review.score}점</p>
					<p>리뷰: {review.text}</p>
				</li>
			))}
		</ul>
	</div>
  );
}