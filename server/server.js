const express = require("express");

const app = express();
const cors = require("cors");
const middleware = require("./middleware");

const port = 5000;

app.use(cors());

app.use(middleware.decodeToken);

app.get("/api/todos", (req, res) => {
	return res.json({
		todos: [
			{
				title: "Task 1",
			},
			{
				title: "Task 1",
			},
			{
				title: "Task 1",
			},
			{
				title: "Task 1",
			},
		],
	});
});

app.listen(port, () => {
	console.log("started");
});
