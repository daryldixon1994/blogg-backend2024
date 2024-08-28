const Blog = require("../../models/Blog");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    let { blogId, commentId } = req.query;
    let id = req.auth;
    let userId = new mongoose.Types.ObjectId(id);
    let cmId = new mongoose.Types.ObjectId(commentId);
    await Blog.updateOne(
      { _id: blogId },
      {
        $pull: {
          comments: { _id: cmId, userId },
        },
      }
    );
    return res.status(204).end();
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
