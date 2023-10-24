
const express = require("express")
const app = express()
const hbs = require('express-handlebars');
const path = require("path")


const Datastore = require('nedb')

const coll1 = new Datastore({
    filename: './static/db/kolekcja2.db',
    autoload: true
});





app.set('views', path.join(__dirname, 'views6'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów


app.get("/", function (req, res) {
    coll1.find({}, (err, docs) => {
        res.render('view2.hbs', { docs });

    })


});

app.get("/handleDelete", (req, res) => {
    const { item } = req.query
    if (typeof item == "Object") {
        for (let t of item) {
            coll1.remove({ _id: t }, (err, docs) => {
                console.log(docs);

            })
        }
    } else {
        coll1.remove({ _id: item }, (err, docs) => {
            console.log(docs);

        })
    }
    coll1.find({}, (err, docs) => {
        res.render('view2.hbs', { docs });
    })



})

app.listen(3000, () => { console.log("good") })