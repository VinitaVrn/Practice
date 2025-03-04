import QRcode  from "qrcode"
import {nanoid} from "nanoid";
import { url } from "../models/link.model.js";
import { history } from "../models/user.model.js";

export const shortit=async(req,res)=>{
    let {original_url,expiresAT} =req.body;
    console.log(expiresAT);
    const userid=req.id;
    console.log(original_url);
    if(!original_url){
        return res.status(400).json({msg:"bad requested"})
    }
    try{
        var shortcode;
        do{
            shortcode=nanoid(6)
            var exists= await url.findOne({shortcode:shortcode})
        }while(exists);
        const short_url=`${req.protocol}://${req.get("host")}/${shortcode}`;
        const qrcode=await QRcode.toDataURL(short_url);

        if(expiresAT){
           expiresAT=new Date(expiresAT).toISOString() 
        }
        const userhistory={
            userid:userid,
            shorturls:short_url,
            expiresAT:expiresAT||null,
            clicks:0,
            last_clicked:null

        }
        await history.create(userhistory) 

        const newshorturl=new url({
            original_url:original_url,
            short_url_code:shortcode,
            short_url:short_url,
            qrcode:qrcode,
            createdat:Date.now(),
            expiresAT:expiresAT||null
        })
        await newshorturl.save()
        res.status(200).json({shortUrl:short_url,qrCode:qrcode})

    }catch(e){
        res.status(500).json({msg:"Internal server error",error:e.message})
    }
}

export  const getshort=async (req,res)=>{
    try{
        const {shortcode}=req.params;

        const urldata= await url.findOne({short_url_code:shortcode})
        console.log(urldata)
        if(!urldata){
            return res.status(404).json({msg:"url not found"})
        }
        const historydata=await history.find({userid:id});
        historydata.clicks+=1;
        historydata.last_clicked=new Date();
        await historydata.save()

        res.redirect(urldata.original_url)
    }catch(e){
        res.status(500).json({ error: "Internal Server Error", message: e.message });
    }
}

export const getuserhistory= async(req,res)=>{
    const id=req.id
    try{
        const historydata=await history.find({userid:id});
        console.log(historydata)
        if(!historydata){
            return res.status(404).json({msg:"no urls found"})
        }
        res.status(200).send(historydata)
    }catch(e){
        res.status(500).json({ error: "Internal Server Error", message: e.message });   
    }
}
