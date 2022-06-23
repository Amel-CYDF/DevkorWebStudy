import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import Header from "../src/components/header";
import axios from "axios";

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

if (loading) return <div>로딩중...</div>;
if (error) return <div>에러가 발생했습니다.</div>;
if (!user) return null;

const delHandler = (e) => {
	e.preventDefault();

	axios
	.delete("http://localhost:8080/user/" + id)
	.then((res) => {
		console.log(res);
		sessionStorage.removeItem("userid");
		alert('회원 탈퇴 성공');
		Router.push('/');
	})
	.catch(err => {
		alert(err.response.data);
	});
}

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
			<form name="join_form" onSubmit={delHandler}>
				<div className="container">
					<div className="content">
					<div className="join-content">
						{/* --- 아이디 입력 Row --- */}
						<div className="join-row">
						<h3 className="join-title">이름(실명)</h3>
						<input
							type="text"
							id="name"
							name="name"
							title="name"
							maxLength="20"
							className="input-text"
							value={user}
							readOnly
						/>
						<span
							className="error-msg"
							id="name-error"
							aria-live="assertive"
						></span>
						</div>
						{/* --- 아이디 입력 Row --- */}
						<div className="join-row">
						<h3 className="join-title">아이디</h3>
						<input
							type="text"
							value={id}
							id="id"
							name="id"
							title="ID"
							maxLength="20"
							className="input-text"
							readOnly
						/>
						<span
							className="error-msg"
							id="id-error"
							aria-live="assertive"
						></span>
						</div>
						</div>
						{/* --- 가입하기 버튼 --- */}
						<div className="btn-area">
						<button type="submit" id="btnjoin" className="btn-join">
							<span>탈퇴하기</span>
						</button>
						</div>
					</div>
				</div>
			</form>
		</div>
		<style jsx>{`
		.content {
			width: 460px;
			// margin: 0 auto;
		}
		.container {
			// min-height: 100vh;
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
			
		}
		
		.input-text {
			height: 50px;
			width: 100%;
			border: solid 2px #f70000;
			border-radius: 6px;
			padding: 10px 10px 10px 14px;
			font-size: 16px;
			box-sizing: border-box;
		}

		.input-text:focus {
			outline: none;
		}

		.btn-area {
			margin: 30px 0 9px;
		}

		.btn-join {
			width: 100%;
			padding: 15px 0 15px;
			display: block;
			font-size: 18px;
			font-weight: 700;
			text-align: center;
			cursor: pointer;
			box-sizing: border-box
			color: #fff;
			border: solid 1px rgba(0,0,0,.08);
			background-color: #f70000;
		}

		.btn-join span {
			color: white;
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