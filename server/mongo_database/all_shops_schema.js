const mongoose  = require("mongoose")

const shopsSchema = new mongoose.Schema({
    _id: { type: Number },
    store_name: { type: String },
    store_email: { type: String },
    store_country: { type: String },
    store_url: { type: String },
    all_coupon_code: [String],
    unistalled:{type:Boolean,default:false},
    merchantTransectionId:{type:Number},
    transection_approved:{type:Boolean,default:false},
    status:{type:String,default:"DECLINED"},
    confirmation_url:{type:String},
    transection: [{
        transection_date: Date,
        order_id: Number,
        customer_email: String,
        coupon_code: String,
        sale_amount: Number
    }]

}, { versionKey: 0, timestamps:true})

module.exports =  mongoose.model("all_shops", shopsSchema);