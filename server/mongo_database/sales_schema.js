
const mongoose = require( 'mongoose');

const slaesSchema = new mongoose.Schema({
    user_id: { type: Number },
    user_first: { type: String },
    user_last: { type: String },
    user_email: { type: String },
    order_date: { type: Date, default: new Date },
    store_name: { type: String },
    store_ID: { type: Number },
    transection_ID: { type: Number },
    transection_amount: { type: Number },
    coupon_code: { type: String }
}, { versionKey: false })

module.exports =  mongoose.model("merchant_sale", slaesSchema);