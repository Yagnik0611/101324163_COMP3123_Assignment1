const express = require("express")
const EmployeeModel= require("../models/Employees")
const routes= express.Router()

routes.get("/employees", async(req,res)=>{

    try{
        const employees = await EmployeeModel.find()
    
         res.status(200).send(employees)
        
       }catch(error){
        res.status(500).send({message: "No employees found."})
       }

})

routes.post("/employees", async(req,res)=>{

    const newEmployee= new EmployeeModel(req.body)
    try{
        await newEmployee.save()

        res.status(201).send(newEmployee)
    }catch(error){
        res.status(500).send({message: "Error while instering "})
    }
   

    
})
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
routes.put("/employees/:eid", async(req,res)=>{

    const employee_id = req.params.eid
    const newEmployee = req.body

     
 try{

       const employee = await EmployeeModel.findById(employee_id)
        
        await employee.updateOne(newEmployee)

        res.status(200).send(employee)

      
    }
    catch(error){
        res.status(500).send({message: "Can not find employee with given id."})
    }
    
})
routes.delete("/employees", async(req,res)=>{

    const employee_id = req.query.eid
    
    try{

        await EmployeeModel.findByIdAndDelete(employee_id)
          res.status(204).send({message: "Employee was successfully deleted from database."})
 
       
     }
     catch(error){
         res.status(500).send({message: "Can not find employee with given id."})
     }
    
})
module.exports = routes