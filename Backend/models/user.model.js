import {Schema, model} from "mongoose";

const userschema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:9
    }
})

const users= model("user",userschema)

const historyurls=new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        ref:users
    },
    shorturls:{
        type:String,
        required:true
    },
    expiresAT:{
        type:Date,
        default:null
    },
    clicks:{
        type:Number
    },
    last_clicked:{
        type: Date,
        default: Date.now
    }
})

const history=model("urlhistory",historyurls)
export {users,history}

