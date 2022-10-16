// importing 
// using jwt to generate token for user when they login 

const express = require("express")
const UserModel = require("../models/User")
const routes= express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
// handling error for user sign up validation 

const handleErrors = (err) => {
    
    let errors = { username: '', email: '' ,password: ''};
  

    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  else if (err.message.includes('User validation failed')) {
    
    Object.values(err.errors).forEach(({ properties }) => {
      
      errors[properties.path] = properties.message;
     
    });

     } 
     else{
        errors={message:"Error while instering New User"}
     }
  return errors;
  
}

//  user sign up 
//http://localhost:3000/api/user/signup



routes.post("/signup", async(req,res)=>{

    const newUser = new UserModel(req.body)
    try{
        await newUser.save()
        res.status(201).send(newUser)
    }catch(error){
        
        const errors = handleErrors(error);
        res.status(500).json({errors})
    }
   
})

//http://localhost:3000/api/user/login

/*
{
    
    "username":"Tommy",
    "email": "Tommy505@gmail.com",
    "password":"tommy"
    

}
{
    "username": "Rohan patel",
    "password":"rohan1106"
    
    }
    sample users to login 
    */


routes.post("/login", async(req,res)=>{

     const user = req.body
     
     try{
            const userdata = await UserModel.findOne( {username: user.username})

            if(userdata ){

                var password = user.password
            // comparing hashed password with input passowrd for user login validation 

                await  bcrypt.compare(password, userdata.password, (err, result)=> {
                    if (result) {
                         // if password matches this follwing code will create token for that user and send it to user
                        jwt.sign({userdata},'secretkey',(err,token)=>{

            
                            res.status(200).send({status : true, username: user.username ,message: "User logged in successfully", accessToken : token})
                        })}
            else{

                    res.status(401).send({ status : false, message: "Invalid Username and password"})}
    })}
            
            
    }catch(error){
        
        res.status(500).send({message:"Error while instering New User"})
    }
      
  
})
//  its example of user with token and this page is only accessible for users with valid tokens 
////http://localhost:3000/api/user/login
routes.get("/login",  veryfyToken,async(req,res)=>{

    jwt.verify(req.token,'secretkey',(err,userdata)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
            userdata
            })
        }
    })
    res.send(" Users information ")
   
})

function veryfyToken(req,res,next){
    const bearerHeader= req.headers['authorization']
if(typeof bearerHeader !== "undefined"){

    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()


}
else{
    res.sendStatus(403)
}

}

module.exports = routes