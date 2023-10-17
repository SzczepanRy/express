const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const formidable = require('formidable');

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/l4/cw2.html"))
})


app.post("/uploadM", (req, res) => {
    // const { data, name, file } = req.body

    let form = formidable({});
    form.multiples = true
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true
    form.parse(req, function (err, fields, files) {

        console.log("----- przesłane pola z formularza ------");

        console.log(fields);

        console.log("----- przesłane formularzem pliki ------");

        console.log(files);

        data = [fields, files]
        res.header("Content-type", "application/json")
        res.send(JSON.stringify(data))
    });
})


app.listen(3000, () => { console.log("runnin"); })