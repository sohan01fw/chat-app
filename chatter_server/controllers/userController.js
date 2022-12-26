const userModel = require("../db/Model/userModel");
const Users = require("../db/Model/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const findEmailExits = await Users.findOne({ email });

    if (findEmailExits) {
      console.log("user already exist");
    } else {
      const saveUser = new Users({
        name,
        email,
        password,
      });
      await saveUser.save();

      return res.json({
        msg: "Successfully user created",
        saveUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUserExist = await Users.findOne({ email });

    if (findUserExist) {
      if (findUserExist.password === password) {
        return res.json({ msg: "Successfully logged in", findUserExist });
      } else {
        return res.status(401).json({ msg: "wrong credential", status: 401 });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({ msg: "user didn't register " });
  }
};
module.exports.chat = async (req, res, next) => {
  try {
    const { userId, AvatarImg } = req.body;
    const saveUser = await Users.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      AvatarImage: AvatarImg,
    });

    return res.json({
      msg: "Successfully avatar created",
      userId,
      AvatarImg,
      isAvatarImageSet: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "avatar didn't create " });
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const getUsers = await Users.find({
      _id: { $ne: req.params.id },
    });

    res.json(getUsers);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Didn't get all users" });
  }
};
