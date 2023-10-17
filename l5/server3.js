


const express = require("express")
const app = express()
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów


const context = {
    subject: "ćwiczenie 3 - dane z tablicy obiektów",
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Homo Deus", author: "Yuval Noah Harari", lang: "CZ" }
    ]
}
app.get("/", function (req, res) {

    res.render('view3.hbs', context);

});


app.listen(3000, () => { console.log("good") })