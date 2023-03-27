const express = require("express");
const postRoute = express.Router();
const {postModel} = require("../models/postmodel");

postRoute.post("/add",async(req,res)=>{
    const payload = req.body;
    try{
        const posts = new postModel(payload);
        await posts.save();
        res.status(200).send({"msg":"Post Added"});
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

postRoute.get("/",async(req,res)=>{
    try{
        let posts = await postModel.find(req.query);
        res.status(200).send(posts);
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

postRoute.get("/top",async(req,res)=>{
    try{
        let posts = await postModel.find(req.query);
        res.status(200).send(posts);
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

postRoute.patch("/update/:id",async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    try{
        await postModel.findByIdAndUpdate({"_id":id},data);
        res.status(200).send({"msg":"Posts has been updated"});
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

postRoute.patch("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        await postModel.findByIdAndDelete({"_id":id});
        res.status(200).send({"msg":"Posts has been updated"});
    }
    catch(err){
        res.status(400).send({"err":err.message});
    }
});

module.exports={postRoute};