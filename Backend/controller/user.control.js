import { users } from "../models/user.model.js";
import { configDotenv } from "dotenv";
configDotenv()
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const secretkey=process.env.secretkey;

const register=async (req, res)=>{
    const {email,password}=req.body;
    
    if(!password||!email){
        return res.status(400).json({msg:"Bad request"})
    }
    
    try{
        const hashedpassword=await argon2.hash(password);
        const newuser={
            email,
            password:hashedpassword,
        }  
      await users.create(newuser)
      res.status(201).json({msg:"Account created successfully",
        user:newuser
      })
    }catch(err){
      res.status(500).json({msg:"Internal server error",
        error:err.message
      })
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    console.log(email,password)
    if(!email ||!password){
        return res.status(400).json({msg:"Bad request"})
    }
    console.log(email,password)
    const userdata=await users.findOne({email:email});
    if(!userdata){
        return res.status(400).json({msg:"wrong username or password"})
    }
    try{
       const iscorrectuser=await argon2.verify(userdata.password,password);
       if(!iscorrectuser){
            
       }
        
        const token= jwt.sign(
            {
              id:userdata._id,
            },secretkey)
        return res.status(200).json({msg:"login successful",
            token:token
        })
      
    }catch(err){
        return res.status(400).json({msg:"Invalid email or password",
            error:err.message
        })
    }
}

export{register,login}