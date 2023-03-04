const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const middleware = require("./middleware");
const pool = require("./queries");

const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/api/todos", middleware.decodeToken, (req, res) => {
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

app.get("/api/test", async (req, res) => {
	const { rows } = await pool.query("select * from testUsers");

	console.log(rows);

	return res.send(rows);
});

app.post("/api/register", async (req, res) => {
	const { email, username, name, age, uid } = req.body;

	const result = await pool.query(
		"INSERT INTO testUsers (email, username, name, age, uid) values($1, $2, $3, $4, $5) RETURNING *",
		[email, username, name, age, uid]
	);

	return res.send(result);
});

app.get("/api/user/:id", async (req, res) => {
	const uid = req.params.id;

	const result = await pool.query("SELECT * FROM testUsers WHERE uid = $1", [
		uid,
	]);

	return res.send(result);
});

app.listen(port, () => {
	console.log("started");
});
