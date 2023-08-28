// main page router

const express = require("express");
const router = express.Router();
const { Post, User } = require("../models");

router.get("/dashboard", async (req, res) => {
  console.log("dashboard route");
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    console.log(postData);

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
