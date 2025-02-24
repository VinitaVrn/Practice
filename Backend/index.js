import express from "express";
import {connect} from "mongoose";
import { configDotenv } from "dotenv";
import { userRouter } from "./router/user.route.js";
import { urlRouter } from "./router/url.router.js";
configDotenv()

const app= express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5500"
}))
app.use("/user",userRouter);
app.use("/url",urlRouter)

const mongodb=process.env.mongo_url

app.listen(2103,async()=>{
    try{
        await connect(mongodb);
        console.log("db connected")
        console.log("server started at http://localhost:2103")
    }catch(e){
        console.log(e.message);
    }
})