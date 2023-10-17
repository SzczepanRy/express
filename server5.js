const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

const context = {
	subject: 'ćwiczenie 5 - dane z tablicy, chaeckbox',
	fields: [{ name: 'title' }, { name: 'author' }, { name: 'lang' }],
	books: [
		{ title: 'Lalka', author: 'B Prus', lang: 'PL' },
		{ title: 'Hamlet', author: 'W Szekspir', lang: 'ENG' },
		{ title: 'Pan Wołodyjowski', author: 'H Sienkiewicz', lang: 'PL' },
		{ title: 'Zamek', author: 'F Kafka', lang: 'CZ' },
	],
};
app.get('/', function (req, res) {
	res.render('view5.hbs', { context });
});
app.get('/data', function (req, res) {
	let arr = req.query;
	arr = [arr.title, arr.author, arr.lang];
	let parsedArr = arr.filter((el) => {
		if (typeof el == 'string') {
			return el;
		}
	});

	console.log(parsedArr);
	let aa = [];

	for (let el of context.books) {
		let ar = [];
		for (let i of parsedArr) {
			el[i];
			ar[i] = el[i];
		}
		aa.push({ val: ar });
	}

	// context.books.forEach((el) => {
	// 	parsedArr.forEach((i) => {
	// 		console.log(i);
	// 		return el[i];
	// 	});
	// });
	console.log(aa);
	res.render('view5.hbs', { context, dis: aa });
});

app.listen(3000, () => {
	console.log('good');
});
