const express = require("express")
const userRoutes = require("./routes/user")
const employeesRoutes = require("./routes/employees")
const mongoose =require("mongoose")

const app = express()
const SERVER_PORT = 3000

mongoose.connect("mongodb+srv://hi:Bj6reTyGa7RsYVFg@cluster0.olmzrvg.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority",{
  useUnifiedTopology: true,
  useNewUrlParser: true
 })

app.use(express.json())
app.use(express.urlencoded())


app.use("/api/user",userRoutes)
app.use("/api/emp",employeesRoutes)



app.route("/")
    .get((req, res) => {
        res.send("<h1>Yagnik Patel - Assignment 1</h1>")
    })

    app.listen(SERVER_PORT, () =>{
      console.log(`Server running at http://localhost:${SERVER_PORT}/`)
  })