const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('static'));

app.get('/product_id/:id', (req, res) => {
	const { id } = req.params;
	if (id === '1') {
		res.sendFile(path.join(__dirname + '/static/products/product1.html'));
	} else if (id === '2') {
		res.sendFile(path.join(__dirname + '/static/products/product2.html'));
	} else if (id === '3') {
		res.sendFile(path.join(__dirname + '/static/products/product3.html'));
	} else {
		res.send('not valid id');
	}
});

app.listen(3000, () => console.log('running'));
