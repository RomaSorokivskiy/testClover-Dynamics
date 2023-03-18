const mongoose = require("mongoose")
const {ObjectId} = require("mongodb");

const cardSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        default: new ObjectId()
    },
    list: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Lists"
    },
    title: {
       type: String,
       default: "New Card"
    },
    description: {
       type: String,
       default: "Default description, start edit or delete"
    },
    date: {
       type: Date,
       default: new Date()
    }
});

module.exports = mongoose.model("Cards", cardSchema);