import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import Router from "next/router";

export default function MyPage() {
	const [text, setText] = useState('');

	useEffect(() => {
		if(sessionStorage.getItem('userid') == null) {
			console.log('not logined!');
			Router.push('/login');
		}
		else {
			setText(sessionStorage.getItem('userid'));
		}
	});

	return (
		<div>
			<p>당신의 id는? {text}</p>
		</div>
	);
}
