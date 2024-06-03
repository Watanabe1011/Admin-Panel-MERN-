const mongoose = require("mongoose")

function connectMongo(){
    mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`)
}

module.exports = connectMongo

