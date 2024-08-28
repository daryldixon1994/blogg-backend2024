const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    // let { title, body } = req.body;
    let id = req.auth;
    let { blogId } = req.params;
    // let filename = req.file?.filename;
    let newBlog = await Blog.findOneAndUpdate(
      { blogId, userId: id },
      {
        $set: {
          ...req.body,
          img: `${req.protocol}//${req.get("host")}/uploads/${
            req.file?.filename
          }`,
        },
      },
      { new: true }
    );
    if (!newBlog) {
      return res.status(404).json({
        status: false,
        error: "you are not allowed to update this blog",
      });
    } else {
      return res.status(200).json({ data: newBlog });
    }
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
