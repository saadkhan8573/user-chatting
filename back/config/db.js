const mongoose = require('mongoose');

const mongoDbConn = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/userchat').then((result) => {
        console.log("Dabase Successfully connected");
    }).catch(err => {
        console.log("Failed to connect")
    })
}

module.exports = mongoDbConn;