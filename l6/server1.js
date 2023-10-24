
const express = require("express")
const app = express()
const hbs = require('express-handlebars');
const path = require("path")


const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: './static/db/kolekcja.db',
    autoload: true
});





app.set('views', path.join(__dirname, 'views6'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów


app.get("/", function (req, res) {

    res.render('view1.hbs');

});

app.get("/handleInsert", (req, res) => {
    const { login, password } = req.query
    if (login && password) {
        coll1.insert({ login, password, timestamp: Date.now() }, function (err, newDoc) {
            console.log("dodano dokument")
            //   console.log(newDoc)
            //console.log("losowe id dokumentu: " + newDoc._id)
            coll1.find({}).sort({ timestamp: 1 }).exec((err, docs) => {
                console.log(docs);
                //  docs = docs.sort((a, b) => { b.login - a.login })
                res.render('view1.hbs', { docs });
            })
        });
    }

})

app.listen(3000, () => { console.log("good") })