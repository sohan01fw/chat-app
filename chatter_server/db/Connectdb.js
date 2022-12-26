const mongoose = require("mongoose");

const dbUrl = process.env.DB;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch(() => {
    console.log("db not connected to database");
  });
