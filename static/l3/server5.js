const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/vals', (req, res) => {
	const { r, g, b, a } = req.body;
	console.log(r, g, b, a);
	res.json({ r: r, g: g, b: b, a: a });
});

app.listen(3000);
