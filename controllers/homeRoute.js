// main page router

const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");

router.get("/", async (req, res) => {
  //get title username and content and render it to my dashboard.handlebars
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      attributes: ["title", "content"],
    });

    console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
