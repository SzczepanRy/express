const express = require('express');
const app = express();
app.use(express.static('static'));

let str = '';
app.get('/products', (req, res) => {
	for (let i = 0; i < 50; i++) {
		let num = Math.floor(Math.random() * 100);
		str =
			str +
			`<a href="http://localhost:3000/product/${num}" > link ${num}</a><br>`;
	}
	res.send(str);
});
app.get('/product/:id', (req, res) => {
	const { id } = req.params;
	res.send(`podstrona z danymi produktu o id =  ${id} `);
});

app.listen(3000, () => console.log('running'));
