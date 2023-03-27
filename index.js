const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const {connection} = require("./db");
require("dotenv").config();
const {auth} = require("./middleware/auth");

const {userRoute} = require("./routes/users");
const {postRoute} = require("./routes/post");
app.use("/user",userRoute);

// app.use(auth);
app.use("/posts",postRoute);

app.get("/",(req,res)=>{
    res.send({"msg":"Welcome to Post Management backend!"});
});

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log({"err":err.message});
        console.log(err);
    }
    console.log(`Server is running on port ${process.env.PORT}`);
});