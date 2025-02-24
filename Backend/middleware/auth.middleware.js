import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";

const secretkey=process.env.secretkey;

class auth{
    authentication=async(req,res,next)=>{
        const token=req.headers["authorization"];
        if(!token){
            return res.status(400).json({msg:"token required"})
        }
        try{
            const decoded=jwt.verify(token,secretkey)
            req.id=decoded.id;
            next();
        }catch(e){
            res.status(401).json({msg:"Access denied. User is unauthenticated"})
        }
    }
}
 export const Authaccess= new auth;