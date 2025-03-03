import {Router} from "express";
import { getshort,shortit ,getuserhistory} from "../controller/url.control.js";
import { Authaccess } from "../middleware/auth.middleware.js";

const urlRouter=Router();

urlRouter.post("/shortit",Authaccess.authentication,shortit);
urlRouter.get("/history",Authaccess.authentication,getuserhistory)

export {urlRouter}