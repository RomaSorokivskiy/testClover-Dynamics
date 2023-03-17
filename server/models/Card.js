const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
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