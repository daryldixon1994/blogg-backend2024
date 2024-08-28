const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    let id = req.auth;
    let data = await Blog.find({ userId: id });
    res.status(200).json({ status: true, data });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
