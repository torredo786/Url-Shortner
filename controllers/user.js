const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {   
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("user", user);
  if (!user) {
    return res.render("login", { error: "Invalid email or password" });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};

module.exports = { handleUserSignUp, handleUserLogin };
