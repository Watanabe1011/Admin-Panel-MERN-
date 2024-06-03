const mongoose = require( 'mongoose');

const promoSetup = new mongoose.Schema({
    promoLink:{type:String,require:true}
},{versionKey:0})

module.exports =  mongoose.model("promo_setup",promoSetup);