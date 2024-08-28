const Blog = require("../../models/Blog");

module.exports = async (req, res) => {
  try {
    let { userId } = req.params;
    let users = await Blog.find({ userId }).populate(
      "comments.userId",
      "userName image"
    );
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
