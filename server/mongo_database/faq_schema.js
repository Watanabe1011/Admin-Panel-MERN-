const mongoose = require( 'mongoose');

const faqQuestion = new mongoose.Schema({
    question:{type:String,required:true},
    answer:{type:String,required:true}
},{versionKey:0,timestamps:0})

module.exports =  mongoose.model("all_FAQ",faqQuestion);