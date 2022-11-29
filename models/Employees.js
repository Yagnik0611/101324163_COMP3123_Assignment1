// validation of data as well creating new Shema for Employees

const mongoose = require("mongoose")
const {isEmail} = require('validator')


const EmployeeSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required : [true, "Please enter a First name."],

    },
    last_name:{
        type:String,
        required : [true, "Please enter a Last name."],

    },
    email:{
        type:String,
        required : [true, "Please enter an Email."],
        unique: true,
        validate:[isEmail, "Please Enter a valid Email."]


    },
    gender:{
        type:String,
         enum : { values: ['Male', 'Female','Other'], message: '{VALUE} is not supported' },
         required : [true, "Please enter a Gender."],

    },
    salary:{
        type: Number,
        required : [true, "Please enter a Salary"]
        


    }
    

})


const Employees = new mongoose.model("Employees",EmployeeSchema)
// exporting newly created collection 
module.exports = Employees