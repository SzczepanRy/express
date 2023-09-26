const express = require("express")
const app = express()
const path = require('path');
const bodyParser = require("body-parser")
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/handleCal", (req, res) => {
    const { v1, v2, cal } = req.body
    let wynik
    let wyniki = []

    if (cal === "suma") {
        wynik = Number(v1) + Number(v2)
    } else if (cal === "różnica") { wynik = Number(v1) - Number(v2) }
    else if (cal === "iloczyn") { wynik = Number(v1) * Number(v2) }
    else if (cal === "iloraz") { wynik = Number(v1) / Number(v2) }
    else if (cal === "wszystko") {
        wyniki = [{ "message": "suma dwu elem", "wynik": Number(v1) + Number(v2) },
        { "message": "róż dwu elem", "wynik": Number(v1) - Number(v2) },
        { "message": "ilocz dwu elem", "wynik": Number(v1) * Number(v2) },
        { "message": "ilora  dwu elem", "wynik": Number(v1) / Number(v2) }]
        res.json({ "message": cal + " dwu elem", "wynik": wyniki })
    }
    res.json({ "message": cal + " dwu elem", "wynik": wynik })
})

app.listen(3000, () => { console.log("running"); })
