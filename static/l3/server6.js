const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.post('/green', (req, res) => {
	let { state } = req.body;
	console.log(typeof state);
	if (state) {
		res.json({ state: false });
	} else {
		res.json({ state: true });
	}
});

app.listen(3000);
