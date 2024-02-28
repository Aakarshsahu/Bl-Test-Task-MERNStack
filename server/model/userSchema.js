const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String,
    phone : String,
    name : String,
    password : String
},{timestamps:true});


const userdb = new mongoose.model("users",userSchema);

module.exports = userdb;