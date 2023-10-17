
const express = require("express")
const app = express()
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów


const context = {
    subject: "ćwiczenie 2 - podstawowy context",
    content: "to jest lorem ipsum",
    footer: "to jest stopka na mojej stronie"
}

app.get("/", function (req, res) {

    res.render('view2.hbs', context);

});


app.listen(3000, () => { console.log("good") })