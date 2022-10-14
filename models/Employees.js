const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required : true

    },
    last_name:{
        type:String,
        required : true

    },
    email:{
        type:String,
        required : true,
        unique: true

    },
    gender:{
        type:String,
        enum : ['Male', 'Female','Other'],

    },
    salary:{
        type: mongoose.Types.Decimal128,
        required : true

    }
    

})

const Employees = new mongoose.model("Employees",EmployeeSchema)
module.exports = Employees