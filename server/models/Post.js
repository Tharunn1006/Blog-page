const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageURL: { type: String, required: true },
    content: { type: String, required: true },
    username: { type: String, required: true },
    category: { type: String, default: "General" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
