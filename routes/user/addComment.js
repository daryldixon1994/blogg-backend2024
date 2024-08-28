const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    let { comment } = req.body;
    let { blogId } = req.params;
    let id = req.auth;

    await Blog.findByIdAndUpdate(blogId, {
      $push: {
        comments: {
          comment,
          userId: id,
          date: new Date(),
        },
      },
    });
    res.status(204).end();
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
