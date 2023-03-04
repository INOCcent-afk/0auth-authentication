import React, { useEffect } from "react";
import axios from "axios";

const ListOfTodo = ({ token }) => {
	useEffect(() => {
		fetchData(token);
	}, [token]);

	const fetchData = async (token) => {
		const result = await axios.get("http://localhost:5000/api/todos", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
	};

	return (
		<div>
			<h1>List of todo</h1>
		</div>
	);
};

export default ListOfTodo;
