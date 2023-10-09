const express = require("express")
const app = express()
const path = require("path")
// const cors = require("cors")
const formidable = require('formidable');

// app.use(cors())
// app.use(express.json())


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/l4/cw4.html"))
})


app.post("/uploadMB", (req, res) => {
    // let calD = Date.now()
    let form = formidable({});
    form.multiples = true
    form.uploadDir = __dirname + '/static/upload/'       // folder do zapisu zdjęcia
    form.keepExtensions = true
    let tab = []

    let endData
    // form.on("file", function () {
    let begin
    // })

    form.on("progress", function (bytesReceived, bytesExpected) {
        let currenttime = new Date().getTime()

        //  let bytesExpected = form.bytesExpected
        //   let bytesReceived = form.bytesReceived
        data = { bytesExpected, bytesReceived, currenttime }
        tab.push(data)
    })

    form.on("fileBegin", function (name, value) {
        begin = new Date().getTime()
        console.log("fileBegin" + new Date().getTime())
    })

    form.on("end", function () {
        let end = new Date().getTime()
        console.log(begin, end);
        let fulltime = end - begin
        endData = [tab, { fulltime: `zajeło ${fulltime} ms` }]

    })
    form.parse(req, function (err, fields, files) {
        res.header("Content-type", "application/json")
        res.send(JSON.stringify(endData, 5, null))

    });


})

app.listen(3000, () => { console.log("runnin"); })