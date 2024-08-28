const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById().select({ password: 0 });
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
