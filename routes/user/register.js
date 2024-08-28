const User = require("../../models/User");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    let { userName, fullName, email, password, dateOfBirth, gender } = req.body;
    //   verify email
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(402).json({
        status: false,
        message: "This email is already in use, please try another one",
      });
    }
    // validation
    let validateEmail = email.match(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    if (!validateEmail) {
      return res.status(402).json({
        status: false,
        message: "Wrong email format, please check again",
      });
    }
    let validatePassword = password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
    if (!validatePassword) {
      return res.status(402).json({
        status: false,
        message: `password requirements:
        At least 8 characters long
        At least one lowercase letter
        At least one uppercase letter
        At least one digit
        At least one special character: @$!%*#?&`,
      });
    }
    //   hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      userName,
      fullName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });
    await newUser.save();
    res
      .status(200)
      .json({ status: true, message: "user was created successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
