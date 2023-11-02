const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');

const Datastore = require('nedb');

const db = new Datastore({
	filename: './static/db/kolekcja7.db',
	autoload: true,
});

app.set('views', path.join(__dirname, 'views7')); // ustalamy katalog views
app.engine(
	'hbs',

	hbs({
		defaultLayout: 'main.hbs',
		extname: '.hbs',
		partialsDir: 'views7/partials',
		helpers: {
			getValue(el) {
				return Object.values(el);
			},
			alertThis(el) {
				let str = '';
				str += 'id : ' + el._id;

				for (let i of el.car) {
					str += `\n ${Object.keys(i)[0]} : ${Object.values(i)[0]} `;
				}
				console.log(str);

				return str;
			},
		},
	})
); // domyślny layout, potem można go zmienić
app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

app.get('/', function (req, res) {
	res.render('index.hbs');
});

app.get('/add', function (req, res) {
	res.render('add.hbs');
});
app.get('/add/newcar', function (req, res) {
	const { ubezpieczony, benzyna, uszkodzony, napend4x4 } = req.query;

	attrib = [{ ubezpieczony }, { benzyna }, { uszkodzony }, { napend4x4 }];
	console.log(attrib);
	car = attrib.filter((el) => {
		console.log(Object.values(el)[0]);
		if (typeof Object.values(el)[0] != 'undefined') {
			console.log('a');
			return el;
		} else {
			console.log('b');

			el[Object.keys(el)] = 'NIE';
			return el;
		}
	});

	db.insert({ car }, (err, el) => {
		res.render('add.hbs', { id: el._id });
	});
});

app.get('/list', function (req, res) {
	db.find({}, (err, cars) => {
		res.render('list.hbs', { cars });
	});
});
app.get('/delete', function (req, res) {
	res.render('delete.hbs');
});
app.get('/edit', function (req, res) {
	res.render('edit.hbs');
});

app.get('/handleInsert', (req, res) => {});

app.listen(3000, () => {
	console.log('good');
});
