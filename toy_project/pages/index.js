import Head from "next/head";
import Header from "../src/components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";

export default function Home() {

const [movies, setMovies] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const [loginStatus, setLoginStatus] = useState(false);
const [avgList, setAvgList] = useState(null);

useEffect(() => {
	if (sessionStorage.getItem("userid") != null) {
		setLoginStatus(true);
	}
	const fetchMovies = async () => {
	try {
		//요청이 시작할 때는 error와 movies를 초기화
		setMovies(null);
		setError(null);
		//loading 상태는 true로 바꿔준다.
		setLoading(true);
		const response = await axios.get("http://localhost:8080/movie");
		setMovies(response.data);
		response = await axios.get("http://localhost:8080/review/score/");
		console.log(response.data);
		setAvgList(response.data);
	} catch (e) {
		setError(e);
	}
	setLoading(false);
	};

	fetchMovies();
}, []);

if (loading) return <div>로딩중...</div>;
if (error) return <div>에러가 발생했습니다.</div>;
if (!movies) return null;

const onClickHandler = (movieid, e) => {
	Router.push("/review/" + movieid);
};

const findAvg = (avglist, comp_id) => {
	const ret = 0;

	avglist.forEach((elem) => {
	if (elem._id == comp_id) {
		ret = elem.score;
	}
	});

	return ret;
};

return (
	<div className="container">
	<Head>
		<title>MOV!E</title>
		<link rel="icon" href="/favicon.ico" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;700;900&display=swap"
		rel="stylesheet"
		/>
	</Head>

	<Header loginStatus={loginStatus} />

	<main>
		<div className="movie-container">
		<div className="title-wrap">
			<h3>현재 상영작</h3>
		</div>
		<div className="movie-list">
			<ul>
			{movies.map((movie) => (
				<li key={movie.id}>
				<div className="movie-item-info">
					<img src={movie.poster} />
					<div className="movie-score">
					<div className="summary">{movie.summary}</div>
					<div className="my-score">
						<div className="preview">
						<p>관람평</p>
						<p>
							{findAvg(avgList, movie.id) ? (
							findAvg(avgList, movie.id).toFixed(1)
							) : (
							<span>0.0</span>
							)}
						</p>
						</div>
					</div>
					</div>
					<div className="title-area">{movie.title}</div>
					<div
					className="review-button"
					onClick={(e) => {
						onClickHandler(movie.id, e);
					}}
					>
					리뷰보기
					</div>
				</div>
				</li>
			))}
			</ul>
		</div>
		</div>
	</main>

	<footer>
		<a
		href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
		target="_blank"
		rel="noopener noreferrer"
		>
		Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
		</a>
	</footer>

	<style jsx>{`
		.container {
		min-height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		}
		.movie-container {
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
		padding-top: 30px;
		border-bottom: 3px solid #241d1e;
		box-sizing: content-box;
		}
		.movie-list {
		margin-top: 40px;
		width: 100%;
		}
		.movie-list ul {
		list-style: none;
		padding: 0;
		margin-left: -60px;
		}
		.movie-list ul li {
		width: 230px;
		height: 450px;
		margin: 0 0 0 60px;
		padding: 0;
		position: relative;
		float: left;
		}
		.movie-list ul li:nth-child(5n) ~ li {
		margin-top: 60px;
		}
		.movie-item-info img {
		height: 331px;
		width: 230px;
		}
		.movie-score {
		position: absolute;
		top: 0;
		left: 0;
		width: 230px;
		height: 331px;
		color: #fff;
		padding: 20px;
		opacity: 0;
		transition: all 0.2s;
		}
		.movie-score:hover {
		top: 0;
		z-index: 1;
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.8);
		transition: all 0.2s;
		}
		.summary {
		display: -webkit-box;
		-webkit-line-clamp: 7;
		-webkit-box-orient: vertical;
		height: 160px;
		overflow: hidden;
		text-overflow: ellipsis;
		}
		.my-score {
		margin-top: 100px;
		overflow: hidden;
		padding: 5px 0 0 0;
		border-top: 1px solid #3c3c3c;
		display: flex;
		align-items: center;
		justify-content: center;
		}
		.preview {
		display: inline-block;
		vertical-align: middle;
		line-height: 36px;
		}
		.preview p:first-child {
		margin: 0 15px 0 0;
		font-size: 0.8667em;
		float: left;
		}
		.preview p:last-child {
		color: #59bec9;
		font-size: 1.6em;
		margin: 0;
		float: left;
		}
		.title-area {
		width: 100%;
		margin: 15px 0 0 0;
		line-height: 25px;
		font-size: 1.3333em;
		font-weight: 700;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		}
		.review-button {
		position: absolute;
		height: 36px;
		bottom: 25px;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 6px;
		background-color: #f70000;
		color: white;
		font-weight: 500;
		width: 100%;
		}
		.review-button:hover {
		cursor: pointer;
		}
		footer {
		width: 100%;
		height: 100px;
		border-top: 1px solid #eaeaea;
		display: flex;
		justify-content: center;
		align-items: center;
		}
		footer img {
		margin-left: 0.5rem;
		}
		footer a {
		display: flex;
		justify-content: center;
		align-items: center;
		}
		a {
		color: inherit;
		text-decoration: none;
		}
		.title a {
		color: #0070f3;
		text-decoration: none;
		}
		.title a:hover,
		.title a:focus,
		.title a:active {
		text-decoration: underline;
		}
		.title {
		margin: 0;
		line-height: 1.15;
		font-size: 4rem;
		}
		.title,
		.description {
		text-align: center;
		}
		.description {
		line-height: 1.5;
		font-size: 1.5rem;
		}
		.logo {
		height: 1em;
		}
		@media (max-width: 600px) {
		.grid {
			width: 100%;
			flex-direction: column;
		}
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