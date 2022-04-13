const JWT = require("jsonwebtoken");
const UserModel = require("../modules/Auth");

const JWT_SECRET = "KHBBHkkjbhkbkjbKBjkbkjbkjbkjbJKBKJBGCFGCXDXDFCGHCGH"

exports.isAuthUser = async (req, res, next) => {
    // const { token } = req.cookies;
    try {
        const authHeader = req.headers.token;
        
        var token = authHeader.split(" ")[1]

        if (!token) {
            res.status(500).json("Please login to access the data");
        }

        const decodedData = JWT.verify(token, JWT_SECRET);
        req.user = await UserModel.findById(decodedData.id)
        return next()
    } catch (err) {
        res.status(400).json("Invalid Token")
    }
}