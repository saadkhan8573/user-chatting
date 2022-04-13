const express = require('express');
const router = express.Router();
const { userChatting, getUserChatList, getUsersChat } = require("../controllers/Chatting.Controller");
const { isAuthUser } = require("../middleware/Auth");

router.route("/chat").post(isAuthUser, userChatting)
router.route("/chat/:senderId").get(isAuthUser, getUserChatList)
router.route("/chat/list/:recieverId").get(isAuthUser,getUsersChat)

module.exports = router;