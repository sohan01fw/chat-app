const messageModel = require("../db/Model/messageModel");

module.exports.addMsg = async (req, res, next) => {
  const { from, to, message } = req.body;
  const saveMessage = await messageModel({
    message: {
      text: message,
    },
    users: [from, to],
    sender: from,
  });
  await saveMessage.save();
  return res.json({
    msg: "Successfully message created",
  });
};
module.exports.getMsg = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const getMsgs = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const displayMsg = getMsgs.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(displayMsg);
  } catch (error) {
    console.log(error);
  }
};
