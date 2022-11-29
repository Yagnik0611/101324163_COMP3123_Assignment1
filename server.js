// all the imports needed for server js

const express = require("express")
const userRoutes = require("./routes/user")
const employeesRoutes = require("./routes/employees")
const mongoose = require("mongoose")
const app = express()
const path = require("path");
const SERVER_PORT =  process.env.PORT || 3001

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded())

// app.use(express.static(path.join(__dirname, "./101324163_comp3123_assignment2_reactjs/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./101324163_comp3123_assignment2_reactjs/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

// connecting to the MongoDB data base
 const DB_URL = process.env.DB_URL || "mongodb+srv://hi:Bj6reTyGa7RsYVFg@cluster0.olmzrvg.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

 
 mongoose.Promise = global.Promise;
 
 app.use("/",userRoutes)

 mongoose.connect(DB_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(() => {
     console.log("Successfully connected to the database mongoDB Atlas Server");    
 }).catch(err => {
     console.log('Could not connect to the database. Exiting now...', err);
     process.exit();
 });


app.use("/api/user",userRoutes)
app.use("/api/emp",employeesRoutes)


// Home page
//http://localhost:3000
app.route("/")
    .get((req, res) => {
        res.send("<h1>Yagnik Patel ID-101324163 - Assignment 1</h1>")
    })

    app.listen(SERVER_PORT, () =>{
      console.log(`Server running at http://localhost:${SERVER_PORT}/`)
  })