import mongoose from "mongoose";

const cartSchema= new mongoose.Schema({
    Title: String,
    Price: String,
    id: Number,
    quantity:Number,
    imgurl:String,
    customerDeviceID:String,
    productid:Number,
    producttype:String
})

const cart = new mongoose.model("CustomerItems",cartSchema);

export {cart,cartSchema};