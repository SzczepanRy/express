const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');

const Datastore = require('nedb');
const { log } = require('console');

const coll1 = new Datastore({
	filename: './static/db/kolekcja2.db',
	autoload: true,
});

app.set('views', path.join(__dirname, 'views6')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.use(express.static('static'));
app.set('view engine', 'hbs'); // określenie nazwy silnika szablonów

let deletetedIds = [];

app.get('/', function (req, res) {
	coll1.find({}, (err, docs) => {
		res.render('view2.hbs', { docs });
	});
});

app.get('/handleDelete', (req, res) => {
	const { item } = req.query;
	let message = 'nie zaznaczono elemnetu';

	if (typeof item == 'object') {
		for (let t of item) {
			coll1.find({ _id: t }, (err, docs) => {
				deletetedIds.push(docs[0]);
			});
			coll1.remove({ _id: t }, (err, docs) => {});
		}
		message = 'usunięto ' + item.length + ' elementy';
	} else if (typeof item == 'string') {
		coll1.find({ _id: item }, (err, docs) => {
			deletetedIds.push(docs[0]);
		});
		coll1.remove({ _id: item }, (err, docs) => {});
		message = 'usunieto jeden element';
	}
	coll1.find({}, (err, docs) => {
		res.render('view2.hbs', { docs, message });
	});
});
app.get('/handleReload', (req, res) => {
	deletetedIds.map((el) => {
		coll1.insert(el, (err, ret) => {
			console.log(ret);
		});
	});
	coll1.find({}, (err, docs) => {
		res.render('view2.hbs', { docs });
	});
});

app.listen(3000, () => {
	console.log('good');
});
