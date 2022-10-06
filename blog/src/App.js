/* eslint-disable*/
import logo from "./logo.svg";
import "./App.css";
// import { useState } from "react";

import React, { useRef, useState, useMemo } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";

function countActiveUsers(users) {
	console.log("활성 사용자 수를 세는중...");
	return users.filter(user => user.active).length;
}

function App() {
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
	});
	const { username, email } = inputs;
	const onChange = e => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};
	const [users, setUsers] = useState([
		{
			id: 1,
			username: "velopert",
			email: "public.velopert@gmail.com",
			active: true,
		},
		{
			id: 2,
			username: "tester",
			email: "tester@example.com",
			active: false,
		},
		{
			id: 3,
			username: "liz",
			email: "liz@example.com",
			active: false,
		},
	]);

	const nextId = useRef(4);
	const onCreate = () => {
		const user = {
			id: nextId.current,
			username,
			email,
		};
		setUsers(users.concat(user));

		setInputs({
			username: "",
			email: "",
		});
		nextId.current += 1;
	};

	const onRemove = id => {
		// user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
		// = user.id 가 id 인 것을 제거함
		setUsers(users.filter(user => user.id !== id));
	};
	const onToggle = id => {
		setUsers(
			users.map(user =>
				user.id === id ? { ...user, active: !user.active } : user
			)
		);
	};
	const count = countActiveUsers(users);
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				onCreate={onCreate}
			/>
			<UserList users={users} onRemove={onRemove} onToggle={onToggle} />
			<div>활성사용자 수 : {count}</div>
		</>
	);
}

// function App() {
// 	let post = "강남 우동 맛집";
// 	let [글제목, 글제목변경] = useState([
// 		"남자 코트 추천",
// 		"여자 코트 추천",
// 		"아동복 코트 추천",
// 	]);
// 	let [따봉, 따봉변경] = useState(0);

// 	return (
// 		<div className="App">
// 			<div className="black-nav">
// 				<h4>블로그임</h4>
// 			</div>
// 			<div className="list">
// 				<h4>
// 					{글제목[0]}{" "}
// 					<span
// 						onClick={() => {
// 							따봉변경(따봉 + 1);
// 						}}
// 					>
// 						👍
// 					</span>{" "}
// 					{따봉}{" "}
// 					<button
// 						onClick={() => {
// 							let copy = [...글제목];
// 							copy[0] = "중년 코트 추천";
// 							글제목변경(copy);
// 						}}
// 					>
// 						글수정
// 					</button>
// 				</h4>
// 				<p>2월 17일 발행</p>
// 			</div>
// 			<div className="list">
// 				<h4>{글제목[1]}</h4>
// 				<p>2월 17일 발행</p>
// 			</div>
// 			<div className="list">
// 				<h4>{글제목[2]}</h4>
// 				<p>2월 17일 발행</p>
// 			</div>
// 			<Modal></Modal>
// 			<Copyright />
// 		</div>
// 	);
// }

// function Modal() {
// 	return (
// 		<div className="modal">
// 			<h4>제목</h4>
// 			<p>날짜</p>
// 			<p>상세내용</p>
// 		</div>
// 	);
// }

// const Copyright = () => {
// 	return "bluevulpe";
// };

export default App;
