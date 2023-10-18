const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

const context = {
	subject: 'ćwiczenie 7 - render tablic, obiektów, tablic obiektów',
	countries: ['Russia', 'India', 'USA'],
	langs: ['polski', 'angielski', 'japoński'],
	digits: [
		[1, 2],
		[3, 4],
		[5, 6],
	],
	user: {
		login: 'aaa',
		password: 'bbb',
		age: 16,
	},
	books: [
		{ title: 'Lalka' },
		{ title: 'Proces' },
		{ title: 'Pan Wołodyjowski' },
	],
};

app.get('/', function (req, res) {
	res.render('view6.hbs', context);
});
app.listen(3000, () => {
	console.log('good');
});
