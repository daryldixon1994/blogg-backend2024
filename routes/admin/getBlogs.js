const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    let data = await Blog.find().populate("comments.userId", "userName image");
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
