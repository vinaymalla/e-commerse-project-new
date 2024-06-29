const mongoose = require('mongoose')
//create schema
const productSchema = new mongoose.Schema({
   
    
    c_id: Number,
    c_name:String


})
module.exports = mongoose.model("cart", productSchema)
