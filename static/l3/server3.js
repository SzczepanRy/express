const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let users = [];

app.post('/addUser', (req, res) => {
	const { name, sirname } = req.body;

	users.push({ name: name, sirname: sirname });
	console.log(users);
	res.json(users);
});

app.listen(3000);
