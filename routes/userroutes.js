const mongoose=require("mongoose");
const {UserModel}=require("../model/usermoodel")
const expres=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const useroute=expres.Router();

//routes

useroute.post("/register",(req,res)=>{
    const {username,email,pass}=req.body;
    try{
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.status(200).json({register:err})
            }
            else{
                const newuser=new UserModel({username,email,pass:hash});
                await newuser.save()
                res.status(200).json({message:"new user register sucessfull"});
            }
        })

    }catch(err){
        res.status(400).json(err)
    }
})

// login

useroute.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const founddetails=await UserModel.findOne({email})
        if(founddetails){
            bcrypt.compare(pass,founddetails.pass,(err,result)=>{
                if(result){
                    const token=jwt.sign({userId:founddetails._id,username:founddetails.username},"masai")
                    res.status(200).json({message:"login Sucessfull",token})
                }
                else{
                    res.status(200).json({message:"detail mismatch"})
                }
            })
        }
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports={
    useroute,
}