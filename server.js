require("dotenv").config();
const express = require("express");
const app = express();
const { dbConn } = require("./src/config/db");
const mainRouter = require("./src/routes/index");

const PORT = process.env.PORT;
dbConn();

app.use(mainRouter);

app.listen(PORT, console.log(`Server is Running at port ${PORT}`));
