const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.DB);
    }catch (e) {
        console.log(e);
    }
}
module.exports = connectDb;