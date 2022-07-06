require("dotenv").config();
const express = require("express");
const app = express();
const { dbConn } = require("./src/config/db");
const { redisConn } = require("./src/config/redis");
const mainRouter = require("./src/routes/index");

const PORT = process.env.PORT;
dbConn();
redisConn();

app.use(mainRouter);

app.listen(PORT, console.log(`Server is Running at port ${PORT}`));
