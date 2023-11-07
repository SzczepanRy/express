const express = require("express")
const hbs = require('express-handlebars');
const { appendFile } = require("fs");
const path = require("path")

const app = express()
const data = require("./data.json")

app.set('views', path.join(__dirname, 'viewsTest'));         // ustalamy katalog views
app.engine('hbs', hbs({
    extname: '.hbs',
    partialsDir: 'viewsTest/partials',
    helpers: {
        filterStars(items) {
            let stars = []
            items.map((el) => {

                if (!stars.includes(el.stars)) {
                    stars.push(el.stars)
                }
            })
            stars = stars.sort((a, b) => b - a).reverse()
            console.log(stars);

            return stars
        },
        filterSelect(items) {
            let selected = []
            items.map((el) => {
                if (!selected.includes(el.category)) {
                    selected.push(el.category)
                }

            })
            return selected
        },
        dispalyStars(stars) {
            stars = Number(stars)
            let arr = []
            for (let i = 0; i < stars; i++) {
                arr.push("http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star.png")

            }

            return arr
        },
        ///helper do dolarów ale pan odpuscił
    }, defaultLayout: 'main.hbs'
}));   // domyślny layout, potem można go zmienić
app.use(express.static("static"))
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów



app.get("/", (req, res) => {
    res.render("view.hbs", data)
})

let items = []
app.get("/filter", (req, res) => {
    const { rating, category } = req.query
    console.log(rating, category);
    if (rating == undefined) {
        res.render("view.hbs", data)
    } else {

        items = []
        data.items.map((el) => {
            console.log(el.category);
            if (el.stars == Number(rating) && (el.category == category || category == "all")) {
                console.log({ rating: el.stars, title: el.title });
                items.push({ rating: el.stars, title: el.title })
            }
        })
        console.log(items);
        res.render("view2.hbs", { items })
    }

})
app.get("/lista", (req, res) => {
    res.render("view2.hbs", { items })
})
app.get("/tabela", (req, res) => {
    res.render("view3.hbs", { items })
})

app.listen(3000, () => { console.log("aaaaa") })