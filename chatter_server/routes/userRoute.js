const {
  register,
  login,
  chat,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/chat", chat);
router.get("/chat/:id", getAllUsers);
module.exports = router;
