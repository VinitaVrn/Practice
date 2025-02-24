import {Schema, model} from "mongoose";

const linkSchema=new Schema({
    original_url:{
        type:String,
        required:true
    },
    short_url_code:{
        type:String,
        required:true,
        unique:true
    },
    short_url:{
        type:String,
        required:true
    },
    qrcode:{
        type:String,
        required:true
    },
    createdat:{ type: Date, default: Date.now },
    expiresAT:{
        type:Date,
        default:null
    }
})
 const url=model("urls",linkSchema)
 
 export {url}