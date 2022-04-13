const UserModel = require("../modules/Auth");
const sendToken = require("../utills/jwtToken");

exports.registerUser = async (req, res) => {
    try {
        const user = await UserModel.create(req.body);

        sendToken(user, 200, res)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            res.status(400).json({
                message: "Invalid Email or password!"
            })
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            res.status(400).json({
                message: "Invalid Email or password!"
            })
        }

        if (isPasswordMatch) {
            sendToken(user, 200, res)
        }

    } catch (err) {
        console.log("Err", err)
        res.status(400).json(err)
    }
}

exports.getUsers = async (req,res) => {
    try{
        const Users = await UserModel.find();
        res.status(200).json(Users);
    }
    catch(err){
        res.status(500).json(err)
    }
}