import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const checkid = (text) => {};

export default function Register() {
	const [id, Setid] = useState("");
	const [name, Setname] = useState("");
	const [pw, Setpw] = useState("");

	const idHandler = (e) => {
		e.preventDefault();
		Setid(e.target.value);
	};
	const nameHandler = (e) => {
		e.preventDefault();
		Setname(e.target.value);
	};
	const pwHandler = (e) => {
		e.preventDefault();
		Setpw(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		const body = {
			id: id,
			name: name,
			pw: pw
		};
		console.log(body);

		axios
			.post("http://localhost:8080/user", body)
			.then((res) => {
				console.log(res);
				alert('회원 가입 성공!');
				Router.push('/login');
			})
			.catch(err => {
				alert(err.response.data);
			});
	};

  return (
    <div className="wrapper">
      <Head>
        <title>MOV!E | 회원가입</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <Link href="/">
          <img src="/banner.png" id="banner" />
        </Link>
      </header>

      <form name="join_form" onSubmit={submitHandler}>
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
				  value={name}
				  onChange={nameHandler}
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
				  onChange={idHandler}
                  id="id"
                  name="id"
                  title="ID"
                  maxLength="20"
                  className="input-text"
                />
                <span
                  className="error-msg"
                  id="id-error"
                  aria-live="assertive"
                ></span>
              </div>
              {/* --- 비밀번호 입력 Row --- */}
              <div className="join-row">
                <h3 className="join-title">비밀번호</h3>
                <input
                  type="password"
                  id="pw1"
                  name="pw1"
                  title="Enter Password"
                  maxLength="20"
                  className="input-text"
				  value={pw}
				  onChange={pwHandler}
                />
                <span
                  className="error-msg"
                  id="pw-error"
                  aria-live="assertive"
                ></span>
              </div>
              {/* --- 비밀번호 재확인 Row --- */}
              <div className="join-row">
                <h3 className="join-title">비밀번호 재확인</h3>
                <input
                  type="password"
                  id="pw2"
                  name="pw2"
                  title="ReEnter Password"
                  maxLength="20"
                  className="input-text"
                />
                <span
                  className="error-msg"
                  id="pw-check-error"
                  aria-live="assertive"
                ></span>
              </div>
              {/* --- 가입하기 버튼 --- */}
              <div className="btn-area">
                <button type="submit" id="btnjoin" className="btn-join">
                  <span>가입하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        h3 {
          margin: 19px 0 8px;
          font-size: 18px;
          font-weight: 700;
        }

        .header {
          position: relative;
          padding: 100px 0 54px;
          padding-bottom: 20px;
          box-sizing: border-box;
          text-align: center;
        }

        .header,
        .container {
          margin: 0 auto;
          max-width: 768px;
          min-width: 460px;
        }

        .content {
          width: 460px;
          margin: 0 auto;
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

        .error-msg {
            color: red;
            display: block;
            margin: 9px 0 -2px;
            font-size: 12px;
            line-height: 14px;
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

        #banner {
          width: 200px;
          height: 50px;
        }

        #banner:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
