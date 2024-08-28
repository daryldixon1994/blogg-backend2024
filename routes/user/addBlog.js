const Blog = require("../../models/Blog");
module.exports = async (req, res) => {
  try {
    let { title, body, categories } = req.body;
    let id = req.auth;

    const newBlog = new Blog({
      title,
      body,
      userId: id,
      img:
        req.file &&
        `${req.protocol}//${req.get("host")}/uploads/${req.file.filename}`,
      categories: categories.split(",").map((elt) => elt.trim()),
    });
    await newBlog.save();
    res.status(204).end();
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
