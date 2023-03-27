const express = require("express");
const userRoute = express.Router();

const {userModel} = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRoute.post("/register",async(req,res)=>{
    const {name,gender,email,age,city,password,is_married} = req.body;
    try{
        bcrypt.hash(password,7,async(err,hash)=>{
            if(err){
                res.status(400).send({"err":err.message});
            }
            else{
                let user = new userModel({name,gender,email,age,city,password:hash,is_married});
                await user.save();
                res.status(200).send({"msg":"Registered Successfully"});
            }
        });
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

userRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    let token = jwt.sign({Avi:"singh"},"Avishek");
                    res.status(200).send({"msg":"Successfully Logged In","token":token});
                }
                else{
                    res.status(400).send({"msg":"Wrong creds"});
                }
            });
        }
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

module.exports={userRoute};


