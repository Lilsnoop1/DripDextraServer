import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import router from "./routes/products.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import axios from "axios";
const app =  express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()) 
app.use(router);
app.use(cookieParser());


mongoose.connect("mongodb+srv://ammar:ammar@cluster0.vuzjvhx.mongodb.net/productsDB");

app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})