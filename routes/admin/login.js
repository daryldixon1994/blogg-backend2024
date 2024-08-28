const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res) => {
  try {
    let SECRET_KEY = process.env.SECRET_KEY;
    let { email, password } = req.body;
    let verifyEmail = await Admin.findOne({ email });
    if (!verifyEmail) {
      return res
        .status(401)
        .json({ status: false, message: "Wrong email or password" });
    }

    let verifyPwd = bcrypt.compareSync(password, verifyEmail.password);
    if (!verifyPwd) {
      return res
        .status(401)
        .json({ status: false, message: "Wrong email or password" });
    }
    // authentication: token => jwt

    let token = jwt.sign(
      { id: verifyEmail._id, isAdmin: verifyEmail.isAdmin },
      SECRET_KEY
    );
    res.status(200).json({
      status: true,
      data: {
        id: verifyEmail._id,
        token,
        isLoggedIn: true,
      },
    });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
