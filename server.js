const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const formidable = require('formidable');
const fs = require("fs")
app.use(express.json());
app.set('views', path.join(__dirname, 'viewsFilemenager2')); // ustalamy katalog views
app.engine(
	'hbs',
	hbs({
		defaultLayout: 'main.hbs',
		extname: '.hbs',
		partialsDir: 'viewsFilemenager2/partials',
		helpers: {


		},
	})
);
app.use(express.static(path.join(__dirname, '/viewsFilemenager2')));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('upload.hbs', { currentPage: 'currentPage' });
});

let filesArr = [];

app.post('/upload', (req, res) => {
	let form = formidable({});
	form.multiples = true;
	form.uploadDir = __dirname + '/upload/'; // folder do zapisu zdjęcia
	form.keepExtensions = true;
	form.parse(req, function (err, fields, files) {
		if (files.upload.length > 0) {
			[...files.upload].forEach((file) => {
				let id =
					filesArr[filesArr.length - 1] === undefined
						? 1
						: filesArr[filesArr.length - 1].id + 1;
				let obraz =
					file.type == 'image/png'
						? '/img/png.png'
						: file.type == 'image/jpeg'
							? '/img/jpg.png'
							: file.type == 'text/plain'
								? '/img/txt.png'
								: file.type == 'text/javascript'
									? '/img/javascript.png'
									: file.type == 'text/html'
										? '/img/html.png'
										: file.type == 'text/css'
											? '/img/css.png'
											: '/img/file.png';
				let name = file.name;
				let size = file.size;
				let type = file.type;
				let path = file.path;
				let savedate = Date.now();
				let obj = { id, obraz, name, size, type, path, savedate };
				console.log(obj);
				filesArr.push(obj);
			});
		} else {
			let file = files.upload;
			let id =
				filesArr[filesArr.length - 1] === undefined
					? 1
					: filesArr[filesArr.length - 1].id + 1;
			let obraz =
				file.type == 'image/png'
					? '/img/png.png'
					: file.type == 'image/jpeg'
						? '/img/jpg.png'
						: file.type == 'text/plain'
							? '/img/txt.png'
							: file.type == 'text/javascript'
								? '/img/javascript.png'
								: file.type == 'text/html'
									? '/img/html.png'
									: file.type == 'text/css'
										? '/img/css.png'
										: '/img/file.png';

			let name = file.name;
			let size = file.size;
			let type = file.type;
			let path = file.path;
			let savedate = Date.now();
			let obj = { id, obraz, name, size, type, path, savedate };
			console.log(obj);
			filesArr.push(obj);
		}

		res.render('upload.hbs', { currentPage: 'currentPage' });
	});
});
app.get('/filemenager', (req, res) => {
	console.log(filesArr);
	res.render('filemenager.hbs', {
		files: filesArr,
		delete: 'Usuń dane o plikach z tablicy',
		currentPage: 'currentPage',
	});
});

app.get('/filemenager2', (req, res) => {
	// console.log(filesArr);
	res.render('filemenager2.hbs', {
		files: filesArr,
		delete: 'Usuń dane o plikach z tablicy',
		currentPage: 'currentPage',
	});
});








app.get('/deleteAll', (req, res) => {
	filesArr = [];
	res.render('filemenager.hbs', {
		files: filesArr,
		delete: 'Usuń dane o plikach z tablicy',
		currentPage: 'currentPage',
	});
});

function findFile(id) {
	console.log(filesArr);

	console.log(filesArr.filter((el) => el.id == id));
	return filesArr.find((el) => el.id == id);
}

app.get('/show', (req, res) => {
	const { id } = req.query;

	let file = findFile(id);
	console.log(file);
	res
		.header('Content-Type', file.type)
		.sendFile(file.path.replaceAll('\\', '/'));
});

let lastFile;
app.get('/infoLast', (req, res) => {
	if (lastFile) {
		res.render('info.hbs', { file: lastFile, info: 'fileinfo' });
	} else {
		res.render('filemenager.hbs', {
			files: filesArr,
			delete: 'Usuń dane o plikach z tablicy',
			currentPage: 'currentPage',
		});
	}
});

app.get('/info', (req, res) => {
	const { id } = req.query;
	let file = findFile(id);
	lastFile = findFile(id);
	console.log(file);
	res.render('info.hbs', { file, info: 'fileinfo' });
});

app.get('/download', (req, res) => {
	const { id } = req.query;
	let file = findFile(id);
	console.log(file);
	res.header('Content-Type', file.type).download(file.path);
});
app.get('/delete', (req, res) => {
	const { id } = req.query;
	filesArr = filesArr.filter((el) => el.id != id);

	res.render('filemenager.hbs', {
		files: filesArr,
		delete: 'Usuń dane o plikach z tablicy',
		currentPage: 'currentPage',
	});
});


app.get("/addFolder", (req, res) => {
	const { name } = req.query
	if (name == undefined) {
		res.json({ "message": "not a valid name" })
	}

	if (!fs.existsSync(path.join(__dirname, `/upload/${name}`))) {
		fs.mkdir(path.join(__dirname, `/upload/${name}`), (err) => {
			if (err) throw err;
			console.log("jest");
		})
	} else {
		fs.mkdir(path.join(__dirname, `/upload/${name + Date.now()}`), (err) => {
			if (err) throw err;
			console.log("jest");
		})
	}
})
app.get("/addFile", (req, res) => {
	const { name } = req.query
	if (name == undefined) {
		res.json({ "message": "not a valid name" })
	}

	if (!fs.existsSync(path.join(__dirname, `/upload/${name}`))) {
		fs.mkdir(path.join(__dirname, `/upload/${name}`), (err) => {
			if (err) throw err;
			console.log("jest");
		})
	} else {
		fs.mkdir(path.join(__dirname, `/upload/${name + Date.now()}`), (err) => {
			if (err) throw err;
			console.log("jest");
		})
	}
})







app.listen(3000, () => {
	console.log('good');
});
