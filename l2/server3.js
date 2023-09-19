const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser")
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));





app.get("/", (req, res) => {
    let cars = ['porche', "audi", "volvo", "scoda", "kkk"]
    let str = ""
    str += " <h1>new   used   broken </h1><form action='/cars' method='post' >"
    for (let i of cars) {
        str += `<div style='display:flex;'><p>${cars.indexOf(i)} -> ${i}</p> 
        <input name="${cars.indexOf(i)}" value="n" type="radio">
        <input name="${cars.indexOf(i)}" value="u" type="radio"><input name="${cars.indexOf(i)}" value="c" type="radio"> </div>`
    }
    str += "<button type='submit'>submit</button></form >"
    res.send(str)
})

app.post("/cars", (req, res) => {
    let nowe = 0
    let używane = 0
    let uszkodzone = 0
    console.log(req.body);
    let b = JSON.stringify(req.body)
    for (let i = 0; i < b.length; i++) {
        if (b[i] === "n") {
            nowe++
        } else if (b[i] === "u") {
            używane++
        } else if (b[i] === "c") {
            uszkodzone++
        }
    }
    console.log({ "nowe": nowe, "używane": używane, "uszkodzone": uszkodzone });
})


app.listen(3000, () => console.log('running'));
