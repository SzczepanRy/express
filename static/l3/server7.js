const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())

app.use(cors())


app.post("/call", (req, res) => {

    const { points } = req.body
    res.json(points)
})

app.listen(3000, () => { console.log("runnin") })