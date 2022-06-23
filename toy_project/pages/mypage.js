import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import Header from "../src/components/header";
import axios from "axios";
import { BsPersonBadge } from "react-icons/bs";

export default function MyPage() {

const [id, setId] = useState("");
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
	if (sessionStorage.getItem("userid") == null) {
	alert("로그인이 필요한 서비스입니다.");
	Router.push("/login");
	} else {
	setId(sessionStorage.getItem("userid"));
	}
}, []);

useEffect(() => {
	if (id == "") return;
	const fetchUser = async (id) => {
	try {
		//요청이 시작할 때에는 user와 error를 초기화, loading은 True로 바꿔준다.
		setUser(null);
		setError(null);
		setLoading(true);
		const response = await axios.get("http://localhost:8080/user/" + id);
		setUser(String(response.data.name));
	} catch (e) {
		setError(e);
	}
	setLoading(false);
	};

	fetchUser(id);
}, [id]);

const onQuit = (e) => {
	e.preventDefault();

	axios
	.delete("http://localhost:8080/user/" + id)
	.then((res) => {
		console.log(res);
		sessionStorage.removeItem("userid");
		alert("회원 탈퇴처리 되었습니다.");
		Router.push("/");
	})
	.catch((err) => {
		alert(err.response.data);
	});
};

if (loading) return <div>로딩중...</div>;
if (error) return <div>에러가 발생했습니다.</div>;
if (!user) return null;

return (
	<div className="container">
	<Head>
		<title>MOV!E | My Page</title>
		<link rel="icon" href="/favicon.ico" />
	</Head>

	<Header loginStatus={id} />

	<div className="wrapper">
		<div className="title-wrap">
		<h3>내 정보 | My Page</h3>
		</div>
		<div className="member-info-wrapper">
		<div className="icon-area">
			<BsPersonBadge size={80} />
		</div>
		<div className="info-row">
			<p>이름: {user}</p>
			<p>아이디: {id}</p>
			<button onClick={onQuit}>탈퇴하기</button>
		</div>
		</div>
	</div>
	<style jsx>{`
		.container {
		min-height: 100vh;
		width: 100vw;
		box-sizing: border-box;
		}

		.wrapper {
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
		line-height: 55px;
		}

		.member-info-wrapper {
		margin-top: 60px;
		width: 100%;
		height: 300px;
		display: flex;
		align-items: center;
		}

		.icon-area {
		width: 80px;
		height: 80px;
		}

		.info-row {
		margin-left: 30px;
		padding: 30px;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 20px;
		}

		.info-row p {
		margin-bottom: 40px;
		width: 200px;
		}

		button {
		width: 200px;
		height: 60px;
		border: none;
		font-size: 20px;
		background: #3c3c3c
		color: white;
		}

		button:hover {
		cursor: pointer;
		}
	`}</style>

	<style jsx global>{`
		html,
		body,
		p {
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