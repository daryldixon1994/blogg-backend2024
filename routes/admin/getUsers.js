const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let users = await User.find().select({ password: 0 });
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
