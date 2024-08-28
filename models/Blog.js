const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    img: {
      type: String,
      default: "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png",
    },
    categories: {
      type: [],
    },
    comments: {
      type: [
        {
          comment: String,
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
          date: {
            type: Date,
          },
        },
      ],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
  },
  { timestamps: true }
);

module.exports = Blog = mongoose.model("blogs", blogSchema);
