const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const path = require('path');

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine(
	'hbs',
	hbs({
		defaultLayout: 'main.hbs',
		helpers: {
			shortTitle: function (title) {
				return title.substring(0, 10) + '...';
			},
			bigHelper: function (title) {
				let arr = title.split(' ');
				let upper = [];
				arr.map((el) => {
					el = el[0].toUpperCase() + el.substring(1);
					upper.push(el);
				});
				return upper.join(' ');
			},
			dashHelper: function (title) {
				let arr = title.split(' ');
				let dashed = [];
				arr.map((el) => {
					dashed.push(el.split('').join('-'));
				});
				return dashed.join(' ');
			},
		},
	})
);
app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

let context = {
	subject: 'T: ćwiczenie 9 - użycie helperów',
	title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
};

app.get('/', function (req, res) {
	res.render('view9.hbs', context);
});

app.get('/data', function (req, res) {
	const { text } = req.query;

	res.render('view9.hbs', { title: text });
});
app.listen(3000, () => {
	console.log('good');
});
