const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())

app.use(cors())


app.post("/call", (req, res) => {

    const { x, y } = req.body
    res.json({ x: x, y: y })
})

app.listen(3000, () => { console.log("runnin") })