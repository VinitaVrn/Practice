import {Router} from "express";
import { register,login } from "../controller/user.control.js";
import { getuserhistory } from "../controller/url.control.js";
import { Authaccess } from "../middleware/auth.middleware.js";

const userRouter= Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/history/:id",Authaccess.authentication,getuserhistory)

export {userRouter}
