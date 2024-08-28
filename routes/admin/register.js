const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    let { adminName, fullName, email, password, dateOfBirth, gender } = req.body;
    //   verify email
    const existedAdmin = await Admin.findOne({ email });
    if (existedAdmin) {
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
    const newAdmin = new Admin({
      adminName,
      fullName,
      email,
      password: hashedPassword,
      dateOfBirth,
      gender,
    });
    await newAdmin.save();
    res
      .status(200)
      .json({ status: true, message: "admin was created successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
