const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    let { blogId } = req.params;
    let id = res.auth;

    const result = await Blog.findOneAndDelete({ blogId, userId: id });
    if (!result) {
      return res.status(404).json({
        status: false,
        error: "You ae not allowed to delete this blog",
      });
    } else {
      return res.status(204).end();
    }
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
