require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (_req, res) => {
  res.json({
    message: "This is lucky movie API",
  });
});

app.listen(PORT, console.log(`Server is Running at port ${PORT}`));
