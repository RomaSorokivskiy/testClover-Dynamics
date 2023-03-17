const mongoose = require("mongoose");

const listsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User"
    },
    title: {
        type:String,
        default: "New list"
    },
    date: {
        type: Date,
        default:new Date()
    }
});

module.exports = mongoose.model("Lists", listsSchema);