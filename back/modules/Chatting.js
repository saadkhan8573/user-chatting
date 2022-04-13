const mongoose = require("mongoose");
const validator = require("validator");

const chatSchema = mongoose.Schema({
    body: {
        type: "String",
        required: [true, "Text is required"]
    },
    recieverName: {
        type: String,
        required: [true, "Reciever Name is required"]
    },
    senderName: {
        type: String,
        required: [true, "Sender Name is required"]
    },
    recieverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "active"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Chat", chatSchema);