// importing collection from model foulder and router
const express = require("express")
const EmployeeModel= require("../models/Employees")
const routes= express.Router()
const jwt = require("jsonwebtoken")


// function to handle validation error  genereated by the  errors written in shema  for the EMployee collection 

const handleErrors = (err) => {
  // screating json error for all the fields 

    let errors = { first_name: '', last_name: '' ,email: '', gender: '' ,salary:''};
  
// catching the unique error msg for emails
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }

  else if (err.message.includes('Employees validation failed')) {
    // looking for errors genereated from validation script 

    Object.values(err.errors).forEach(({ properties }) => {
      
      errors[properties.path] = properties.message;
     
    });

     } 
     else{
        // for any other errors we run into 
        errors={message:"Error while instering New Employee"}
     }
  return errors;
  
}

// get method for getting list of employees
// http://localhost:3000/api/emp/employees

routes.get("/employees",veryfyToken, async(req,res)=>{

    try{
        const employees = await EmployeeModel.find()
    
         res.status(200).json(employees)
        
       }catch(error){
        res.status(500).send({message: "No employees found."})
       }

})
// sample input 
/*

{
"first_name": "Tam",
"last_name": "Harrow",
"email":  "tam@hollywood.com",
"gender": "Male",
"salary": 125500.00
}
*/

// instering the employee inside collection 
//http://localhost:3000/api/emp/employees
routes.post("/employees", async(req,res)=>{

    const newEmployee= new EmployeeModel(req.body)
    try{
        await newEmployee.save()

        res.status(201).send(newEmployee)
    }catch(error){
        const errors = handleErrors(error);
        res.status(500).json({errors})
    }
   

    
})
//http://localhost:3000/api/emp/employees/634ade1af2ffd0f6fcf52fa2
// get employee with id

routes.get("/employees/:eid", async(req,res)=>{

const employee_id = req.params.eid
     
     try{

       const employee = await EmployeeModel.findById(employee_id)
       
        res.status(200).send(employee)

      
    }
    catch(error){
        res.status(500).send({message: "Can not find employee with given id."})
    }
    
})
// update employee with id

routes.put("/employees/:eid", async(req,res)=>{

    const employee_id = req.params.eid
    const newEmployee = req.body

     
 try{

       const employee = await EmployeeModel.findById(employee_id)
        
        await employee.updateOne(newEmployee)

        res.status(200).send(newEmployee)

      
    }
    catch(error){
        const errors = handleErrors(error);
        res.status(500).json({errors})
    }
    
})
//http://localhost:3000/api/emp/employees?eid=634ade1af2ffd0f6fcf52fa2
routes.delete("/employees", async(req,res)=>{

    const employee_id = req.query.eid
    
    try{

        await EmployeeModel.findByIdAndDelete(employee_id)
          res.status(204).send({message: "Employee was successfully deleted from database."})
 
       
     }
     catch(error){
         res.status().send({message: "Can not find employee with given id."})
     }
    
})

function veryfyToken(req,res,next){
    
  if(  req.headers['authorization'] !== undefined){
    
    const   bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    const bearer = bearerHeader.split(' ');
    console.log(bearer)
    const bearerToken = bearer[1]
  
    jwt.verify(bearerToken,'secretkey',(err,userdata)=>{

    if(err){
            res.sendStatus(403);
        }
        else{
           next()
            
        
            
        }
    })
    

}
else{
    res.sendStatus(403)
}

}
module.exports = routes