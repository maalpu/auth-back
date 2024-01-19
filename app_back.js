const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const authenticate = require('./auth/authenticate')
require("dotenv").config()

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

async function connection() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING)
  console.log("Connected to MongoDB")
}

connection().catch(console.error)

app.use("/api/login", require("./routes/login"))
app.use("/api/refreshToken", require("./routes/refreshToken"))
app.use("/api/signout", require("./routes/signout"))
app.use("/api/signup", require("./routes/signup"))
app.use("/api/todos", authenticate, require("./routes/todos"))
app.use("/api/user", authenticate, require("./routes/user"))
app.use("/api/product", authenticate, require("./routes/product"))

app.get("/", (req, res) => {
  res.send("Hola Mundo")
})

app.listen(port, (req, res) => {
  console.log(`Server is running on port: ${port}`)
})
