const mongoose = require( 'mongoose');

// -----------------------
// Mongosse schema for storing the data of every user who create a referal link and some other additional details like email and name to generate coupon code and send it to the email address.
// -----------------------

const linkSchema = new mongoose.Schema({
    user_first_name: { type: String },
    user_last_name: { type: String },
    user_email: { type: String, required: true, default: "NotValid" },
    all_registered_shops: [String],
    // length of user_campaign_Array will be giving each user total orders just by checking codeUsed true
    user_all_transectionL: [{
        order_id: { type: Number },
        total_amount: { type: Number },
        store_name: { type: String }
    }]
}, { timestamps: false, versionKey: false });


module.exports =  mongoose.model("user_custom_link", linkSchema);

