const Chat = require("../modules/Chatting");

exports.userChatting = async (req, res) => {
    try {

        const message = {
            body: req.body.message,
            recieverName: req.body.recieverName,
            senderName: req.user.name,
            recieverId: req.body.recieverId,
            senderId: req.user._id
        }

        const ChatData = await Chat.create(message);
        res.status(201).json({
            ChatData,
            message: "Message Sent Sucessfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Something is missing"
        })
    }
}

exports.getUserChatList = async (req, res) => {
    console.log("req.params.senderId",req.params.senderId,req.user._id)
    try {
        // const ChatList = await Chat.find({ senderId: req.params.senderId });
        const ChatList = await Chat.find({ $or: [{ senderId: req.params.senderId }, { recieverId: req.params.senderId }] });

        res.status(200).json({
            ChatList,
            length: ChatList.length
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
}


exports.getUsersChat = async (req, res) => {
    try {
        // const ChatList = await Chat.find({ $and: [{ senderId: req.user._id }, { recieverId: req.params.recieverId }] });
        const ChatList = await Chat.find({
            $and: [
                { $or: [{ senderId: req.user._id }, { senderId: req.params.recieverId }] },
                { $or: [{ recieverId: req.params.recieverId }, { recieverId: req.user._id }] }
            ]
        });
        res.status(200).json(ChatList)

    }
    catch (err) {
        res.status(500).json(err)
    }
}