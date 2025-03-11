const{Router}=require("express");
const {adminModel}=require("../db");
const bcrypt=require("bcrypt");
const{z}=require("zod");
const jwt=require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;
const createAdmin=Router();
createAdmin.post('/signup',async (req,res)=>{
    const requireBody=z.object({
        email:z.string().min(5).max(100).email(),
        password:z.string().min(5).max(100),
        name:z.string().min(5).max(100)
    })
    const parseDataWithSucess=requireBody.safeParse(req.body);
    if(!parseDataWithSucess.success){
       return res.status(400).json({
            message:"Incorrect format",
            error:parseDataWithSucess.error
        });
    }
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
    try{
        const hasedPassword=await bcrypt.hash(password,10);
        await adminModel.create({
            email:email,
            password:hasedPassword,
            name:name
        });
        return res.json({
            message:"You are Signed up"
        })
    }catch(e){
        return res.status(500).json({
            message:"Error During signUp",
            error:e.message
        })
    }
});
createAdmin.post('/signin',async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const response=await adminModel.findOne({
        email:email
    });
    if(!response){
        res.status(403).json({
            message:"user dosent exist"
        })
    }
    const passwordMatch=await bcrypt.compare(password,response.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:response._id.toString()
        },JWT_SECRET);
        return res.json({
            token
        })
    }else{
        return res.status(403).json({
        message:"Incorrect cread"
    })
    }
   
});
module.exports={
    createAdmin:createAdmin
}