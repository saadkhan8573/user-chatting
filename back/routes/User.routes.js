const express = require('express');
const router = express.Router();
const { registerUser, loginUser,getUsers } = require("../controllers/User.Controller");
const { isAuthUser } = require('../middleware/Auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/users').get(isAuthUser,getUsers);

module.exports = router;