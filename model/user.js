const mongoose = require('mongoose')
//create schema
const productSchema = new mongoose.Schema({
    p_id: Number,
    p_name: String,
    p_pwd: String,
    


})
module.exports = mongoose.model("Users", productSchema)