const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

// MIDDLEWARE — verify login
function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// CREATE POST
router.post("/", auth, async (req, res) => {
  const { title, imageURL, content, category } = req.body;

  if (!title || !imageURL || !content || !category) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const post = new Post({
    title,
    imageURL,
    content,
    category,
    username: req.user.username,
    owner: req.user.id,
  });

  await post.save();
  res.json(post);
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

module.exports = router;
