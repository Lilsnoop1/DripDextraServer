import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    imgurl: String,
    Title: String,
    Price: String,
    id: Number
})

const rings = new mongoose.model("Ring",productSchema);
const bracelets = new mongoose.model("Bracelet",productSchema);
const watches = new mongoose.model("Watch",productSchema);

export {rings,bracelets,watches};