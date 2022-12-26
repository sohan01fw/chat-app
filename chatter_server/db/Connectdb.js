const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://sohancwact:sohanmern123@cluster0.hfp9io8.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("db connected successfully");
  })
  .catch(() => {
    console.log("db not connected to database");
  });
