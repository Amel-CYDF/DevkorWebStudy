import Link from "next/link";
import {
  IoPersonAddOutline,
  IoPersonOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

const Header = () => (
  <header
    className="header-container"
    style={{ borderBottom: "solid 2px red" }}
  >
    <div className="inner-header">
      <h1>
        <img src="/logo.png" id="logo" />
        <img src="/banner.png" id="banner" />
      </h1>
      <div className="blank"></div>
      <div className="header-memberinfo">
        <Link href="/login" className="link">
          <div className="member-content">
            <IoLockClosedOutline size="34" />
            <span>로그인</span>
          </div>
        </Link>
        <Link href="/register" className="link">
          <div className="member-content">
            <IoPersonAddOutline size="35" />
            <span>회원가입</span>
          </div>
        </Link>
        <Link href="/mypage" className="link">
          <div className="member-content">
            <IoPersonOutline size="35" />
            <span>My Page</span>
          </div>
        </Link>
      </div>
      <style jsx>{`
        .header-container {
          height: 115px;
          width: 100vw;
          background: white;
        }

        .inner-header {
          display: flex;
          justify-content: space-around;
          align-items: center;
          font-size: 20px;
          font-family: "Noto Sans KR", sans-serif;
          width: 1400px;
          height: 110px;
          margin: 0 auto;
        }

        .blank {
          flex-grow: 7;
        }

        .header-memberinfo {
          display: flex;
          flex-grow: 1;
          justify-content: center;
        }

        .member-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-right: 60px;
          transition: all 0.3s;
        }

        .member-content span {
          margin-top: 5px;
          font-size: 16px;
        }

        h1 {
          font-size: 30px;
          display: flex;
          align-items: center;
          flex-grow: 2;
        }

        #logo {
          width: 80px;
          height: 80px;
          margin-right: 15px;
        }

        #banner {
          width: 120px;
          height: 30px;
        }

        .member-content:hover {
          cursor: pointer;
          color: red;
          transition: all 0.3s;
        }
      `}</style>
    </div>
  </header>
);

export default Header;