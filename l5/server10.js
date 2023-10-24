const express = require('express');
const app = express();
let data = require('./data/data.json');
const hbs = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine(
	'hbs',
	hbs({
		defaultLayout: 'main.hbs',
		extname: '.hbs',
		partialsDir: 'views/partials',
	})
);

app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

app.get('/', function (req, res) {
	res.render('view10.hbs', data);
});
app.listen(3000, () => {
	console.log('good');
});
