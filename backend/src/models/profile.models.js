const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    refresh_token:{
        type:String,
        default:''
    }


}, { timestamps: true });

// Create model from the schema
const model = mongoose.model("profile",Schema)// It's better to use the capitalized form "User" for model name
module.exports = model;
