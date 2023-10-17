


const express = require("express")
const app = express()
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów

const context = {
    subject: "ćwiczenie 4 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}
app.get("/", function (req, res) {

    res.render('view4.hbs', context);

});
app.get("/data", function (req, res) {
    const { dis } = req.query


    let aa = context.books.map((el) => {
        return { val: el[dis] }
    })
    console.log(aa);


    res.render('view4.hbs', { context, dis: aa });

});


app.listen(3000, () => { console.log("good") })