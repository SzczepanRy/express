const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());

app.post('/slider', (req, res) => {
	const { val } = req.body;
	console.log(val);
	res.json({ val: Number(val) * 2 });
});

app.listen(3000);
