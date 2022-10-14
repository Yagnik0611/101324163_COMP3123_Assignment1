const express = require("express")
const UserModel = require("../models/User")
const routes= express.Router()

routes.post("/signup", async(req,res)=>{

    const newUser= new UserModel(req.body)
    try{
        await newUser.save()
        res.status(201).send(newUser)
    }catch(error){
        res.status(500).send({message: "Error while instering "})
    }
   
})

routes.post("/login", async(req,res)=>{

     const user = req.body
     
     try{

        if(await UserModel.findOne( {username: user.username, password: user.password})){
       
        res.status(201).send({status : true, username: user.username ,message: "User logged in successfully"})}
        else{

            res.status(401).send({ status : false, message: "Invalid Username and password"})}
        
    }catch(error){
        res.status(500).send({message: "Error while logging."})
    }
      
  
})
module.exports = routes