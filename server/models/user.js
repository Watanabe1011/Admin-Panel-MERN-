const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userName: { type: String, require: true },
    userEmail: { type: String, require: true },
    password: { type: String, require: true },
    isSuperAdmin: { type: Boolean, default: false },
    forgetPassword: { type: Boolean, default: false },
    verificationCode: { type: String },
}, { versionKey: 0, timestamps: 0 })

module.exports = mongoose.model("userDetail", userSchema);