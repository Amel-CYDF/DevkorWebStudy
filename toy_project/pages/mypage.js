import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"


export default function MyPage() {
	const [cookie, setCookie, removeCookie] = useCookies(['userInfo']);
	const [text, setText] = useState('');

	useEffect(() => {
		getCookie();
	}, []);

	const getCookie = () => {
		setText(Cookies.get(userInfo).id);
	}

	return (
		<div>
			<p>당신의 id는? {text}</p>
		</div>
	);
}
