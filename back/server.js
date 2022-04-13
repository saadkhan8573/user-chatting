const app = require('./app');
require('dotenv').config()
const mongoDbConn = require("./config/db");

// dotenv.config({ path: "back/config/config.env" });
console.log("Process",process.env.DB_URI)
mongoDbConn();

app.listen(4000, () => {
    console.log(`port running on server http://localhost:4000`)
})