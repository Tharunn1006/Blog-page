require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// IMPORT ROUTES
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

// CREATE EXPRESS APP  ✅ (this must come BEFORE app.use)
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/posts", postsRoute);
app.use("/api/auth", authRoute);

// CONNECT TO MONGO
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✔");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("MongoDB Error:", err));
