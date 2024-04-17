const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

//User registration
const registerController = async (req, res) => {
  const password = req.body.password;
  try {
    const hash = bcrypt.hashSync(password, 10);
    const data = { ...req.body, password: hash };
    const newUser = new userModel(data);
    const registeredUser = await newUser.save();

    res.status(201).json({ message: "registered successfully" });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
//Login
const loginController = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  let phone = Number(emailOrPhone);
  if (!phone) phone = -1;
  try {
    const user = await userModel.findOne({
      $or: [{ email: emailOrPhone }, { phone: phone }],
    });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // compare password
    const isPassword = bcrypt.compareSync(password, user.password);
    if (isPassword) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT,
        { expiresIn: "12h" }
      );
      res.cookie("access_token", token);
      const { password, ...other } = user;
      console.log(other);
      return res.json({ ...user._doc, token: token });
    } else {
      res.json({ error: "Wrong password try again" });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
};
module.exports = { registerController, loginController };
