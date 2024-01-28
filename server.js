const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
const { log } = require("console");
const fse = require("fs-extra");

app.use(express.json());
app.set("views", path.join(__dirname, "viewsFilemenager5")); // ustalamy katalog views
app.engine(
    "hbs",
    hbs({
        defaultLayout: "main.hbs",
        extname: ".hbs",
        partialsDir: "viewsFilemenager5/partials",
        helpers: {
            checkIfImg(name) {
                console.log(name);
                if (name.toLowerCase().includes(".png") || name.toLowerCase().includes(".jpg")) {
                    return true;
                }
                return false;
            },
            checkFolder(name) {
                //  console.log(name);
                if (name == "/img/folder.png") {
                    return true;
                } else {
                    return false;
                }
            },
            checkIfHome(name) {
                if (name == "/upload") {
                    return false;
                } else {
                    return true;
                }
            },
            splitPath(path) {
                let arr = path.split("/");
                arr = arr.filter((el) => {
                    if (el != "") {
                        //          console.log(el);
                        return el;
                    }
                });
                let target = [];
                let temp = "";
                //     console.log(arr);

                for (el of arr) {
                    temp = temp + "/" + el;
                    target.push(temp);
                }
                return target;
            },
        },
    })
);
app.use(express.static(path.join(__dirname, "/viewsFilemenager5")));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("upload.hbs", { currentPage: "currentPage" });
});

let filesArr = [];

let currentPath = "/upload";

let styles = {
    color: "white",
    size: 14,
};

const effects = [{ name: "grayscale" }, { name: "invert" }, { name: "sepia" }];

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
    let filenames = fs.readdirSync(path.join(__dirname, `${currentPath}/`));

    let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];
    let fileList = [];
    filenames.map((el) => {
        let arr = el.split(".");
        if (
            fs.existsSync(path.join(__dirname, `${currentPath}/${el}`)) &&
            fs.lstatSync(path.join(__dirname, `${currentPath}/${el}`)).isDirectory()
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

    if (!fs.existsSync(path.join(__dirname, `${currentPath}/${name}`))) {
        fs.mkdir(path.join(__dirname, `${currentPath}/${name}`), (err) => {
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

    let possible = ["js", "html", "css"];
    let extention;
    if (name.includes(".") && possible.includes(name.split(".")[name.split(".").length - 1])) {
        extention = name.split(".")[name.split(".").length - 1];
    } else {
        extention = "all";
    }

    // let types = ["css", "html", "txt", "js", "png", "jpg"];

    let templates = {
        js: "console.log('hello world')",
        html: "<h1>hello world</h1>",
        css: `
            .body{
                background-color:'black';
            }`,
        all: "hello world",
    };

    if (!fs.existsSync(path.join(__dirname, `${currentPath}/${name}`))) {
        fs.writeFile(path.join(__dirname, `${currentPath}/${name}`), templates[extention], (err) => {
            if (err) throw err;
            console.log("jest");
        });
    } else {
        fs.writeFile(path.join(__dirname, `${currentPath}/${name + Date.now()}`), "created at " + Date.now(), (err) => {
            if (err) throw err;
            console.log("jest");
        });
    }
});

app.post("/upload2", (req, res) => {
    let form = formidable({});
    form.multiples = true;
    form.uploadDir = __dirname + `${currentPath}/`; // folder do zapisu zdjęcia
    form.keepExtensions = true;

    form.on("fileBegin", function (name, file) {
        if (!fs.existsSync(path.join(__dirname, `${currentPath}/${file.name}`))) {
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
        let filenames = fs.readdirSync(path.join(__dirname, `${currentPath}/`));
        let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];

        filenames.map((el) => {
            let arr = el.split(".");
            if (
                fs.existsSync(path.join(__dirname, `${currentPath}/${el}`)) &&
                fs.lstatSync(path.join(__dirname, `${currentPath}/${el}`)).isDirectory()
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
        //   console.log(fileList);
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
    console.log(name, currentPath);
    if (name && fs.existsSync(path.join(__dirname, `${currentPath}/${name}`))) {
        fs.unlink(path.join(__dirname, `${currentPath}/${name}`), (err) => {
            if (err) {
                fs.rmdir(path.join(__dirname, `${currentPath}/${name}`), { recursive: true }, (err) => {
                    if (err) throw err;
                });
            }
        });
        //  currentPath = currentPath.slice(0, -name.length + 1);
        // currentPath = currentPath[0];
        res.json({ message: "deleted file" });
    } else {
        res.json({ message: "not deleted" });
    }
});

app.get("/changePath", (req, res) => {
    let { newPath } = req.query;
    console.log(newPath + " new pa");
    currentPath = currentPath + newPath;

    let filenames = fs.readdirSync(path.join(__dirname, `${currentPath}/`));

    let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];
    let fileList = [];
    filenames.map((el) => {
        let arr = el.split(".");
        if (
            fs.existsSync(path.join(__dirname, `${currentPath}/${el}`)) &&
            fs.lstatSync(path.join(__dirname, `${currentPath}/${el}`)).isDirectory()
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

app.get("/updatePath", (req, res) => {
    const { updatePath } = req.query;
    currentPath = updatePath;

    let filenames = fs.readdirSync(path.join(__dirname, `${currentPath}/`));

    let types = ["css", "html", "txt", "js", "png", "jpg", "folder"];
    let fileList = [];
    filenames.map((el) => {
        let arr = el.split(".");
        if (
            fs.existsSync(path.join(__dirname, `${currentPath}/${el}`)) &&
            fs.lstatSync(path.join(__dirname, `${currentPath}/${el}`)).isDirectory()
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

app.get("/renamePath", (req, res) => {
    const { newDir } = req.query;
    let newPath = currentPath.split("/");
    newPath.pop();
    newPath = newPath.join("/");
    newPath = `${newPath}/${newDir}`;

    if (!fs.existsSync(path.join(__dirname, `${newPath}`))) {
        fse.copySync(path.join(__dirname, `${currentPath}`), path.join(__dirname, `${newPath}`));
        fs.rmdirSync(path.join(__dirname, `${currentPath}`), { recursive: true });

        currentPath = newPath;
        res.redirect("/filemenager2");
    } else {
        res.json({ message: "fail" });
    }
});

app.get("/renameFile", (req, res) => {
    const { newName, oldName } = req.query;
    console.log(currentPath);

    fs.rename(
        path.join(__dirname, `${currentPath}/${oldName}`),
        path.join(__dirname, `${currentPath}/${newName}`),
        (err) => {
            if (err) console.log(err);
            console.log("ok reanmed ");
            res.redirect("/filemenager2");
        }
    );
});

app.post("/saveValue", (req, res) => {
    const { textAreaValue, fileName } = req.body;

    fs.writeFile(path.join(__dirname, `${currentPath}/${fileName}`), textAreaValue, (err) => {
        if (err) throw err;
        console.log("plik zapisany");
        res.sendStatus(200);
    });
});

app.get("/showFile", (req, res) => {
    const { name } = req.query;
    let data = "errorr reading a file";
    data = fs.readFileSync(path.join(__dirname, `${currentPath}/${name}`), "utf8");

    res.render("showFile.hbs", {
        currentPath,
        data,
        name,
        size: styles.size,
        color: styles.color,
    });
});
app.use("/upload", express.static("upload"));
app.get("/showImage", (req, res) => {
    const { name } = req.query;
    let data = "errorr reading a img";

    // data = fs.readFileSync(path.join(__dirname, `${currentPath}/${name}`), "utf8");

    res.render("showImage.hbs", {
        currentPath,
        data,
        name,
        effects,
        imagePath: `${currentPath}/${name}`,
        nav: `${currentPath}/${name}`,
    });
});

app.get("/viewfile", (req, res) => {
    const { name } = req.query;
    console.log(name);
    let data = fs.readFileSync(path.join(__dirname, `${currentPath}/${name}`), "utf8");
    res.send("<a href='http://localhost:3000/filemenager2'>home</a> <pre>\n" + data + "\n</pre>");
});

app.get("/getStyles", (req, res) => {
    res.json({ styles });
});

app.post("/saveStyles", (req, res) => {
    const { color, size } = req.body;

    styles = {
        color,
        size,
    };
    console.log(styles);
    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("good");
});
