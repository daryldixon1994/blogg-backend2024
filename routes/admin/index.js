const express = require("express");
const route = express.Router();
const verify = require("../../middlewares/verifyAdmin");
// /api/admin/register
// route.post("/register", require("./register"));

// /api/admin/login
route.post("/login", require("./login"));

// /api/admin/getUsers
route.get("/getUsers", verify, require("./getUsers"));

// /api/admin/getUser
route.get("/getUser/:id", verify, require("./getUser"));

// /api/admin/getUserBlogs
route.get("/getUserBlogs/:userId", verify, require("./getUserBlogs"));

// /api/admin/getBlogs
route.get("/getBlogs", verify, require("./getBlogs"));

module.exports = route;
