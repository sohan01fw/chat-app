const { addMsg, getMsg } = require("../controllers/messageController");

const Msgrouter = require("express").Router();
Msgrouter.post("/addMsg", addMsg);
Msgrouter.post("/getMsg", getMsg);
module.exports = Msgrouter;
