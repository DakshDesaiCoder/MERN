const mongoose = require("mongoose")
const cardSchema=mongoose.Schema({
    name:{
        type:String,
    },
    url:{
        type:String
    }
})
const Cards = mongoose.model('Cards',cardSchema)
module.exports=Cards