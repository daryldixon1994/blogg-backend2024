const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
// constants
const URI = process.env.URI;
const port = 5000 || process.env.port;
// connect to monggo db atlas
mongoose
  .connect(URI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

//   middlewares
// parsing data
app.use(express.json());

// routes
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));

// listen
app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server is up and running");
});