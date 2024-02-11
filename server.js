import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
import router from "./routes/products.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import axios from "axios";
const app =  express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()) 
app.use(router);
app.use(cookieParser());


mongoose.connect(process.env.CONNECT);

app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})