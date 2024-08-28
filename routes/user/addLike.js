const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    let { blogId } = req.params;
    let id = req.auth;
    await Blog.findByIdAndUpdate(blogId, {
      $push: {
        likes: id,
      },
    });
    res.status(204).end();
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
