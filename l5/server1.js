
const express = require("express")
const app = express()
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

app.get("/", function (req, res) {

    res.render('view1.hbs');

});

app.get("/:name", function (req, res) {
    const { name } = req.params
    console.log(name);
    if (name == "login") {
        res.render('view1.hbs');
    } else {
        res.render('index.hbs');
    }
});
app.listen(3000, () => { console.log("good") })