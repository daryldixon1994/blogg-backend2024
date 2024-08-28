const express = require("express");
const router = express.Router();
const verify = require("../../middlewares/verifyToken");
const multer = require("../../middlewares/multer");
// /api/user/register
router.post("/register", require("./register"));

// /api/user/login
router.post("/login", require("./login"));

// /api/user/addBlog
router.post("/addBlog", verify, multer.single("picture"), require("./addBlog"));

// /api/user/editBlog
router.put(
  "/editBlog/:blogId",
  verify,
  multer.single("picture"),
  require("./editBlog")
);

// /api/user/deleteBlog
router.delete("/deleteBlog/:blogId", verify, require("./deleteBlog"));

// /api/user/getOwnBlogs
router.get("/getOwnBlogs", verify, require("./getOwnBlogs"));

// /api/user/getBlogs
router.get("/getBlogs", verify, require("./getBlogs"));

// /api/user/getSingleBlog
router.get("/getSingleBlog/:id", verify, require("./getSingleBlog"));

// /api/user/getBlogs
router.get("/getBlogs/:cat", verify, require("./filterBlogs"));

// /api/user/addComment
router.patch("/addComment/:blogId", verify, require("./addComment"));

// /api/user/addLike
router.patch("/addLike/:blogId", verify, require("./addLike"));

// /api/user/editComment
router.patch("/editComment", verify, require("./editComment"));

// /api/user/deleteComment
router.patch("/deleteComment", verify, require("./deleteComment"));

// /api/user/updateInfos
router.patch(
  "/updateInfos",
  verify,
  multer.single("picture"),
  require("./updateInfos")
);

module.exports = router;
