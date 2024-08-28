const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let id = req.auth;
    let newUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,
          image: `${req.protocol}//${req.get("host")}/uploads/${
            req.file?.filename
          }`,
        },
      },
      { new: true }
    );
    if (!newUser) {
      return res.status(404).json({
        status: false,
        error: "you are not allowed to update this blog",
      });
    } else {
      return res.status(200).json({ data: newUser });
    }
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
