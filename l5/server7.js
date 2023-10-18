const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

let context = {
	subject: 'ćwiczenie 8 - if...else',
	books: [
		{ title: 'Lalka', lang: 'PL', author: 'B Prus' },
		{ title: 'Hamlet', lang: 'ENG', author: 'W Szekspir' },
		{ title: 'Pan Wołodyjowski', lang: 'PL' },
	],
};

app.get('/', function (req, res) {
	res.render('view7.hbs', context);
});
app.listen(3000, () => {
	console.log('good');
});
