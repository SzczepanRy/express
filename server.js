const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
const { log } = require("console");
app.use(express.json());
app.set("views", path.join(__dirname, "viewsFilemenager3")); // ustalamy katalog views
app.engine(
	"hbs",
	hbs({
		defaultLayout: "main.hbs",
		extname: ".hbs",
		partialsDir: "viewsFilemenager3/partials",
		helpers: {
			checkFolder(name) {
				console.log(name);
				if (name == "/img/folder.png") {
					return true;
				} else {
					return false;
				}
			},
			splitPath(path) {
				let arr = path.split("/")
				console.log(arr);
				arr.filter((el) => {
					if (el != "") {
						console.log(el);
						return el
					}
				})
				let target = []
				let temp = ""
				for (el of arr) {
					temp = temp + "/" + el
					target.push(temp)
				}
				return target
			}
		},
	})
);
app.use(express.static(path.join(__dirname, "/viewsFilemenager3")));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
	res.render("upload.hbs", { currentPage: "currentPage" });
});

let filesArr = [];

let currentPath = ''

app.post("/upload", (req, res) => {
	let form = formidable({});
	form.multiples = true;
	form.uploadDir = __dirname + "/upload/"; // folder do zapisu zdjęcia
	form.keepExtensions = true;
	form.on("fileBegin", function (name, file) {
		file.path = form.uploadDir + "/" + file.name;
	});
	form.parse(req, function (err, fields, files) {
		if (files.upload.length > 0) {
			[...files.upload].forEach((file) => {
				let id = filesArr[filesArr.length - 1] === undefined ? 1 : filesArr[filesArr.length - 1].id + 1;
				let obraz =
					file.type == "image/png"
						? "/img/png.png"
						: file.type == "image/jpeg"
							? "/img/jpg.png"
							: file.type == "text/plain"
								? "/img/txt.png"
								: file.type == "text/javascript"
									? "/img/javascript.png"
									: file.type == "text/html"
										? "/img/html.png"
										: file.type == "text/css"
											? "/img/css.png"
											: "/img/file.png";
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
			let id = filesArr[filesArr.length - 1] === undefined ? 1 : filesArr[filesArr.length - 1].id + 1;
			let obraz =
				file.type == "image/png"
					? "/img/png.png"
					: file.type == "image/jpeg"
						? "/img/jpg.png"
						: file.type == "text/plain"
							? "/img/txt.png"
							: file.type == "text/javascript"
								? "/img/javascript.png"
								: file.type == "text/html"
									? "/img/html.png"
									: file.type == "text/css"
										? "/img/css.png"
										: "/img/file.png";

			let name = file.name;
			let size = file.size;
			let type = file.type;
			let path = file.path;
			let savedate = Date.now();
			let obj = { id, obraz, name, size, type, path, savedate };

			filesArr.push(obj);
		}

		res.render("upload.hbs", { currentPage: "currentPage" });
	});
});

app.get("/filemenager", (req, res) => {

	res.render("filemenager.hbs", {
		files: filesArr,
		delete: "Usuń dane o plikach z tablicy",
		currentPage: "currentPage",
	});
});

app.get("/filemenager2", (req, res) => {
	let filenames = fs.readdirSync(path.join(__dirname, `/upload/`));

	let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];
	let fileList = [];
	filenames.map((el) => {
		let arr = el.split(".");
		if (
			fs.existsSync(path.join(__dirname, `/upload${currentPath}/${el}`)) &&
			fs.lstatSync(path.join(__dirname, `/upload${currentPath}/${el}`)).isDirectory()
		) {
			arr.push("folder");
			fileList.unshift({
				name: el,
				obraz: types.includes(arr[arr.length - 1]) ? `/img/${arr[arr.length - 1]}.png` : "/img/file.png",
			});
		} else {
			fileList.push({
				name: el,
				obraz: types.includes(arr[arr.length - 1]) ? `/img/${arr[arr.length - 1]}.png` : "/img/file.png",
			});
		}
	});

	res.render("filemenager2.hbs", {
		currentPath: currentPath,
		files: fileList,
		delete: "Usuń dane o plikach z tablicy",
		currentPage: "currentPage",
	});
});

app.get("/deleteAll", (req, res) => {
	filesArr = [];
	res.render("filemenager.hbs", {
		files: filesArr,
		delete: "Usuń dane o plikach z tablicy",
		currentPage: "currentPage",
	});
});

function findFile(id) {



	return filesArr.find((el) => el.id == id);
}

app.get("/show", (req, res) => {
	const { id } = req.query;

	let file = findFile(id);

	res.header("Content-Type", file.type).sendFile(file.path.replaceAll("\\", "/"));
});

let lastFile;
app.get("/infoLast", (req, res) => {
	if (lastFile) {
		res.render("info.hbs", { file: lastFile, info: "fileinfo" });
	} else {
		res.render("filemenager.hbs", {
			files: filesArr,
			delete: "Usuń dane o plikach z tablicy",
			currentPage: "currentPage",
		});
	}
});

app.get("/info", (req, res) => {
	const { id } = req.query;
	let file = findFile(id);
	lastFile = findFile(id);
	console.log(file);
	res.render("info.hbs", { file, info: "fileinfo" });
});

app.get("/download", (req, res) => {
	const { id } = req.query;
	let file = findFile(id);
	console.log(file);
	res.header("Content-Type", file.type).download(file.path);
});
app.get("/delete", (req, res) => {
	const { id } = req.query;
	filesArr = filesArr.filter((el) => el.id != id);

	res.render("filemenager.hbs", {
		files: filesArr,
		delete: "Usuń dane o plikach z tablicy",
		currentPage: "currentPage",
	});
});

app.get("/addFolder", (req, res) => {
	const { name } = req.query;
	if (name == undefined) {
		res.json({ message: "not a valid name" });
	}

	if (!fs.existsSync(path.join(__dirname, `/upload${currentPath}/${name}`))) {
		fs.mkdir(path.join(__dirname, `/upload${currentPath}/${name}`), (err) => {
			if (err) throw err;
			console.log("jest");
		});
	}

});
app.get("/addFile", (req, res) => {
	const { name } = req.query;
	if (name == undefined) {
		res.json({ message: "not a valid name" });
	}

	if (!fs.existsSync(path.join(__dirname, `/upload/${name}`))) {
		fs.writeFile(path.join(__dirname, `/upload/${name}`), "created at " + Date.now(), (err) => {
			if (err) throw err;
			console.log("jest");
		});
	} else {
		fs.writeFile(path.join(__dirname, `/upload/${name + Date.now()}`), "created at " + Date.now(), (err) => {
			if (err) throw err;
			console.log("jest");
		});
	}
});

app.post("/upload2", (req, res) => {
	let form = formidable({});
	form.multiples = true;
	form.uploadDir = __dirname + "/upload/"; // folder do zapisu zdjęcia
	form.keepExtensions = true;

	form.on("fileBegin", function (name, file) {
		if (!fs.existsSync(path.join(__dirname, `/upload/${file.name}`))) {
			file.path = form.uploadDir + "/" + file.name;
		} else {
			file.path =
				form.uploadDir +
				"/" +
				[file.name.split(".")[0], Date.now(), ".", file.name.split(".")[file.name.split(".").length - 1]].join(
					""
				);
		}
	});

	form.parse(req, function (err, fields, files) {
		let fileList = [];
		let filenames = fs.readdirSync(path.join(__dirname, `/upload/`));
		let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];

		filenames.map((el) => {
			let arr = el.split(".");
			if (
				fs.existsSync(path.join(__dirname, `/upload/${el}`)) &&
				fs.lstatSync(path.join(__dirname, `/upload/${el}`)).isDirectory()
			) {
				arr.push("folder");
				fileList.unshift({
					name: el,
					obraz: types.includes(arr[arr.length - 1]) ? `/img/${arr[arr.length - 1]}.png` : "/img/file.png",
				});
			} else {
				fileList.push({
					name: el,
					obraz: types.includes(arr[arr.length - 1]) ? `/img/${arr[arr.length - 1]}.png` : "/img/file.png",
				});
			}
		});
		console.log(fileList);
		res.render("filemenager2.hbs", {
			currentPath: currentPath,
			files: fileList,
			delete: "Usuń dane o plikach z tablicy",
			currentPage: "currentPage",
		});
	});
});
app.post("/delete2", (req, res) => {
	const { name } = req.body;

	if (name && fs.existsSync(path.join(__dirname, `/upload/${name}`))) {
		fs.unlink(path.join(__dirname, `/upload/${name}`), (err) => {
			if (err) {
				fs.rmdir(path.join(__dirname, `/upload/${name}`), (err) => {
					if (err) throw err;
				});
			}
		});
		res.json({ message: "deleted file" });
	} else {
		res.json({ message: "not deleted" });
	}
});


app.get("/changePath", (req, res) => {
	let { newPath } = req.query

	// console.log(currentpath + "aaaa" + newPath);
	currentPath = currentPath + newPath

	console.log(currentPath);
	let filenames = fs.readdirSync(path.join(__dirname, `/upload${currentPath}/`));
	console.log(filenames);
	let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];
	let fileList = [];
	filenames.map((el) => {
		let arr = el.split(".");
		if (
			fs.existsSync(path.join(__dirname, `/upload${currentPath}/${el}`)) &&
			fs.lstatSync(path.join(__dirname, `/upload${currentPath}/${el}`)).isDirectory()
		) {
			arr.push("folder");
			fileList.unshift({
				name: el,
				obraz: types.includes(arr[arr.length - 1]) ? `/img/${arr[arr.length - 1]}.png` : "/img/file.png",
			});
		} else {
			fileList.push({
				name: el,
				obraz: types.includes(arr[arr.length - 1]) ? `/img/${arr[arr.length - 1]}.png` : "/img/file.png",
			});
		}
	});
	console.log(fileList);
	res.render("filemenager2.hbs", {
		currentPath: currentPath,
		files: fileList,
		delete: "Usuń dane o plikach z tablicy",
		currentPage: "currentPage",
	});

})



app.listen(3000, () => {
	console.log("good");
});
