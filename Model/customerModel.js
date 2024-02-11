import mongoose from "mongoose";
import { cartSchema } from "./cartModel.js";

const customerSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    itemsOrdered:[cartSchema]

})

const customers = new mongoose.model("Customers",customerSchema);

export {customers};