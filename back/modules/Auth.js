const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "KHBBHkkjbhkbkjbKBjkbkjbkjbkjbJKBKJBGCFGCXDXDFCGHCGH"
const JWT_EXPIRE = "1d"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field is required"],
        maxlength: [30, "Max Length is 30"],
        minlength: [4, "Min Length is 4"],
        unique : [true]
    },
    email: {
        type: String,
        required: [true, "Email field is required"],
        unique: [true],
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Password Field is required"],
        minlength: [8, "Min Length is 8"],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);