const express = require("express");
const Router = require("express").Router();
const authRouter = require("./auth");

Router.get("/", (_req, res) => {
  res.json({
    message: "This is Lucky Movie API",
  });
});
Router.use("/auth", authRouter);
// Router.use("/user");
// Router.use("/movies");
// Router.use("/transaction");
Router.get("*", (_req, res) => {
  res.status(404).json({
    message: "Api Not Found",
  });
});

module.exports = Router;
