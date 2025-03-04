import express from "express";
import {connect} from "mongoose";
import { configDotenv } from "dotenv";
import { userRouter } from "./router/user.route.js";
import { urlRouter } from "./router/url.router.js";
import { getshort } from "./controller/url.control.js";
import { Authaccess } from "./middleware/auth.middleware.js";
configDotenv()
import cors from "cors";

const app= express();
app.use(express.json());
app.use(cors())
app.use("/user",userRouter);
app.use("/url",urlRouter)
app.get("/:shortcode",getshort)


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