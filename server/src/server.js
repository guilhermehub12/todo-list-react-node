const express = require('express')
const cors = require("cors")
const todosRoutes = require("./routes")
const app = express()

app.use(express.json())
app.use(cors())
app.use(todosRoutes)

app.get("/health", (req, res) => {
    res.json("on")
})

app.listen(3000, () => {
    console.log("app listening on port 3000");
})