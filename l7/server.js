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
			alertThis(el) {
				console.log(el);
				let str = '';
				for (let i = 0; i < 5; i++) {
					str += `\n ${Object.keys(el)[i]} : ${Object.values(el)[i]}`;
				}
				console.log(str);
				return str;
			},
		},
	})
);
app.use(express.static(path.join(__dirname, '/views7')));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
	res.render('index.hbs');
});

app.get('/add', function (req, res) {
	res.render('add.hbs');
});
app.get('/add/newcar', function (req, res) {
	const { ubezpieczony, benzyna, uszkodzony, napend4x4 } = req.query;

	let car = {};

	attrib = [{ ubezpieczony }, { benzyna }, { uszkodzony }, { napend4x4 }];
	console.log(attrib);
	attrib.filter((el) => {
		if (typeof Object.values(el)[0] != 'undefined') {
			car[Object.keys(el)[0]] = Object.values(el)[0];
		} else {
			car[Object.keys(el)[0]] = 'NIE';
		}
	});

	console.log(car);
	db.insert(car, (err, el) => {
		res.render('add.hbs', { id: el._id });
	});
});

app.get('/list', function (req, res) {
	db.find({}, (err, cars) => {
		res.render('list.hbs', { cars });
	});
});

app.get('/delete', function (req, res) {
	db.find({}, (err, cars) => {
		res.render('delete.hbs', { cars });
	});
});

app.get('/delete/handle', function (req, res) {
	const { _id } = req.query;
	let message = 'did not find a car';
	console.log(_id);
	if (typeof _id == 'object') {
		for (let t of _id) {
			db.remove({ _id: t });
		}
		message = 'deleted ' + _id.length + ' cars';
	} else if (typeof _id == 'string') {
		if (_id == 'all') {
			db.remove({}, { multi: true });
			message = 'deleted all cares';
		} else {
			db.remove({ _id: _id });
			message = 'deleted one car';
		}
	}
	db.find({}, (err, cars) => {
		res.render('delete.hbs', { cars, message });
	});
});

app.get('/edit', function (req, res) {
	db.find({}, (err, cars) => {
		res.render('edit.hbs', { cars });
	});

	// res.render('edit.hbs');
});
app.get('/edit/update', function (req, res) {
	const { id, ubezpieczony, benzyna, uszkodzony, napend4x4 } = req.query;
	db.find({ _id: id }, (err, car) => {
		console.log(car);
		let updated = { ubezpieczony, benzyna, uszkodzony, napend4x4, _id: id };
		db.remove({ _id: id });
		db.insert(updated);
		db.find({}, (err, cars) => {
			res.render('edit.hbs', { cars });
		});
	});
});

app.listen(3000, () => {
	console.log('good');
});
