const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const listsSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new ObjectId()
    },
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