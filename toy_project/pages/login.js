import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";

export default function Login() {
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");

  const displayId = (e) => {
    setIdInput(e.target.value);
  };
  const displayPw = (e) => {
    setPwInput(e.target.value);
  };

  const onClearId = () => {
    setIdInput("");
  };
  const onClearPw = () => {
    setPwInput("");
  };

  const submitHandler = (e) => {
	e.preventDefault();

	const body = {
		id: idInput,
		pw: pwInput
	};
	console.log(body);

	axios
		.post("http://localhost:8080/user/login", body)
		.then((res) => {
			console.log(res);
			if(res.status == 200) {
				sessionStorage.setItem('userid', res.data);
				Router.push('/');
			}
		});
  };

  return (
    <div className="wrapper">
      <Head>
        <title>MOV!E | 로그인</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="inner-header">
          <Link href="/">
            <img src="/banner.png" id="banner" />
          </Link>
        </div>
      </header>

      <div className="container">
        <div className="content">
          <div className="login-wrap">
            <form
              id="frmNIDLogin"
              name="frmNIDLogin"
              target="_top"
              autocomplete="off"
            //   method="POST"
            //   action="/user/login"
			  onSubmit={submitHandler}
            >
              <div className="login-inner">
                {/* ------ 아이디, 패스워드 wrapper ------ */}
                <div className="id-pw-wrap">
                  <div className="input-row" id="id_line">
                    <IoPersonOutline className="icon-cell" size="24" />
                    <input
                      type="text"
                      id="id"
                      name="id"
                      placeholder="아이디(ID)"
                      title="아이디"
                      className="input-text"
                      maxlength="41"
                      value={idInput}
                      onChange={displayId}
                    />
                    <span
                      role="button"
                      className="btn-delete"
                      id="id-clear"
                      onClick={onClearId}
                    >
                      <TiDelete size="30" className="icon-delete" />
                    </span>
                  </div>
                  <div className="input-row" id="pw_line">
                    <IoLockClosedOutline className="icon-cell" size="24" />
                    <input
                      type="password"
                      id="pw"
                      name="pw"
                      placeholder="비밀번호(Password)"
                      title="비밀번호"
                      className="input-text"
                      maxlength="16"
                      value={pwInput}
                      onChange={displayPw}
                    />
                    <span
                      role="button"
                      className="btn-delete"
                      id="id-clear"
                      onClick={onClearPw}
                    >
                      <TiDelete size="30" className="icon-delete" />
                    </span>
                  </div>
                </div>
                {/* ------ 로그인 버튼 ------ */}
                <div className="btn-login-wrap">
                  <button type="submit" className="btn-login" id="btn-login">
                    <span>로그인</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ul className="find-wrap">
            <li>비밀번호 찾기</li>
            <li>아이디 찾기</li>
            <li>
              <Link href="/register">
                <span id="register-link">회원가입</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .header {
          padding-bottom: 48px;
          box-sizing: border-box;
        }

        .inner-header {
          position: relative;
          width: 740px;
          margin: 0 auto;
          text-align: center;
          box-sizing: border-box;
        }

        .login-wrap {
          width: 460px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .login-inner {
          padding: 20px 28px;
        }

        .id-pw-wrap {
          position: relative;
          z-index: 3;
          margin-top: -8px;
          border: 1.5px solid #F70000;
          border-radius: 6px;
          background-color: #fff;
          box-shadow: 0 5px 8px 0 rgb(68 68 68 / 4%);
        }

        .input-row {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 14px 17px 13px;
          box-sizing: border-box;
        }

        .input-row:first-child {
          border-radius: 6px 6px 0 0;
          box-shadow: none;
          border-bottom: 1.5px solid #F70000;
        }

        .input-row:last-child {
          border-radius: 0 0 6px 6px;
        }

        .icon-cell {
          width: 24px;
          vertical-align; middle;
        }

        .input-text {
          padding-right: 30px;
          margin-left: 5px;
          border: none;
          font-size: 16px;
          width: 75%;
          height: 24px;
        }
        
        .input-text:focus {
          outline: none;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          background-color: #fff;
          width: 35px;
          height: 35px;
        }

        .icon-delete {
          display: inline-block;
          margin: 8px 0 0 8px;
          background-position: -244px -187px;
          background-repeat: no-repeat;
        }

        .btn-login-wrap {
          margin-top: 38px;
        }

        .btn-login {
          display: block;
          width: 100%;
          padding: 13px 0 13px;
          border-radius: 6px;
          border: solid 1px rgba(0,0,0,.15);
          background-color: #ED3124;
          box-sizing: border-box;
          font-size: 20px;
          color: #fff;
          font-weight: 700;
          line-height: 24px;
        }

        .btn-login:hover {
          cursor: pointer;
        }

        .find-wrap {
          padding: 20px 0 35px;
          text-align: center;
          color: #888;
        }

        .find-wrap li {
          display: inline-block;
          position: relative;
        }

        .find-wrap li:hover {
          cursor: pointer;
        }

        .find-wrap li+li {
          padding-left: 28px;
        }

        .find-wrap li+li::before {
          content: "|";
          padding-right: 28px;
        }

        #register-link {
          color: #888;
          text-decoration: none;
        }

        #register-link:visited {
          color: #888;
          underline: none;
        }

        #banner {
          width: 200px;
          height: 50px;
          margin-top: 22vh;
        }

        #banner:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
