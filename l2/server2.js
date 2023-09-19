const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser")
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/static/l2/cw1.html"))
})








app.get("/handleGet", (req, res) => {
    console.log(JSON.stringify(req.query));
    let color = req.query.color

    res.send(`<html style='height:100vh ; width:100vw; background-color:${color}; font-size:200px;'  >${color}</html>`)
});
app.use(express.json());//??????????????????????????????
app.post("/handlePost", (req, res) => {
    console.log(req.body);
    let { color } = req.body
    console.log(color);
    res.send(`<html style='height:100vh ; width:100vw; background-color:${color}; font-size:200px;'  >${color}</html>`)
})


app.listen(3000, () => console.log('running'));
