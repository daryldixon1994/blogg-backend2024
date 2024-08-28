const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = async (req, res, next) => {
  let { token } = req.headers;
  //   console.log(token);
  let SECRET_KEY = process.env.SECRET_KEY;
  if (!token) {
    return res.status(404).json({ status: false, message: "ACESS DENIED" });
  }
  jwt.verify(token, SECRET_KEY, (err, result) => {
    if (err) {
      console.log("err", err.message);
      return res.status(400).json({ status: false, message: err.message });
    }

    if (!result.isAdmin) {
      return res.status(400).json({ status: false, message: "Not allowed" });
    }
    req.auth = result.id;
    next();
  });
};
