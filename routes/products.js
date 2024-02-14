import express from "express";
import getData from "../scrapers/aliExpressScraper.js";
import mongoose, { get } from "mongoose";
import {rings,watches,bracelets} from "../Model/productModel.js";
import {cart} from "../Model/cartModel.js"
import { customers } from "../Model/customerModel.js";
import axios from "axios"
const router = express.Router();


var deviceID=null;


router.get("/rings",async (req,res)=>{
    const getAll = await rings.find({});
    res.json(getAll)
    const Data = await getData("https://www.aliexpress.com/w/wholesale-rings-for-men.html?spm=a2g0o.home.search.0");
    const deleter = await rings.deleteMany({});
    const adder = await rings.insertMany(Data);
})
router.get("/bracelets",async (req,res)=>{
    const getAll = await bracelets.find({});
    res.json(getAll);
    const Data = await getData("https://www.aliexpress.com/w/wholesale-men's-bracelet.html?spm=a2g0o.detail.history.1.9d65ARKVARKVmI");
    const deleter = await bracelets.deleteMany({});
    const adder = await bracelets.insertMany(Data);
})
router.get("/watches",async (req,res)=>{
    const getAll = await watches.find({});
    res.json(getAll)
    const Data = await getData("https://www.aliexpress.com/w/wholesale-men's-watches.html?page=3&g=y&SearchText=men%27s+watches&sortType=price_asc");
    const deleter = await watches.deleteMany({});
    const adder = await watches.insertMany(Data);
})
router.post("/cart",async (req,res)=>{
    var dataaChecker = false;
    const {Title,Price,id,quantity,imgurl,customerDeviceID,productid,producttype} = req.body;
    deviceID = customerDeviceID;
    try{
        const checkData = await cart.find({customerDeviceID:deviceID});
        checkData.map((singleData,index)=>{
            if(singleData.Title===Title){
                dataaChecker=true;
            }        
        })
        if(dataaChecker===true){
            await cart.findOneAndUpdate({Title:Title},{quantity:quantity})
        }else{
           await cart.create({Title,Price,id,quantity,imgurl,customerDeviceID,productid,producttype});
        }
        const sendData = await cart.find({customerDeviceID:deviceID});
        res.json(sendData);
        console.log(sendData);
    }
    catch (err){
        res.json({error:err.message})
    }
})
router.get("/carter",async (req,res)=>{
    const sendCartData = await cart.find({customerDeviceID:deviceID});
    res.json(sendCartData);
})

router.post("/xyz",async (req,res)=>{
    deviceID = req.body.deviceId;
    console.log(deviceID);
    res.json({"noerror":"noerror"});
})
router.post("/update",async (req,res)=>{
    const {Header,quantity} = req.body
    const updater = await cart.findOneAndUpdate({Title:Header},{quantity:quantity});
    const  responsetoSend = await cart.find({Title:Header});
    res.json(responsetoSend);
})

router.post("/deletefromcart",async (req,res)=>{
    console.log("pingedDelete")
    const {Header,id} = req.body;
    const deleter = await cart.deleteOne({Title:Header,id:id});
    const responseafterDelete = await cart.find({customerDeviceID:deviceID});
    res.json(responseafterDelete);
})
router.post("/submit",async (req,res)=>{
    console.log("pingedSubmit");
    const {itemOrdered,email,contact,firstName,lastName,address} = req.body;
    const checkEmail = await axios("https://api.emailable.com/v1/verify?email="+email+"&api_key=live_f6071e8b8ae067babadf");
    console.log(checkEmail);
    try{
        if(checkEmail.data.state==="deliverable"){
            res.json("success");
            const addem = await customers.create({email:email,contact:contact,fname:firstName,lname:lastName,address:address,itemsOrdered:itemOrdered})
        }
        console.log(addem)
    }catch(error){
        res.json(error.message);
    }
})

router.get("/cartamount",async (req,res)=>{
    const counter = await cart.countDocuments({customerDeviceID:deviceID});
    res.json({cartvalues:counter});
})

export default router;