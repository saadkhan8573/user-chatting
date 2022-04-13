const express = require('express');
const app = express();
const cors = require("cors");
// require('dotenv').config()
const user = require("./routes/User.routes");
const chatting = require("./routes/Chatting.Routes");

// dotenv.config({ path: "back/config/config.env" });


app.use(cors())
app.use(express.json());

app.use("/api/v1", user);
app.use("/api/v1", chatting);

module.exports = app;