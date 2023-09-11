// main page router

const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "user_id", "post_id", "id"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
      attributes: ["title", "content", "user_id"],
    });

    console.log(postData);
    const posts = postData.map((post) => post.get({ plain: true }));

    const userId = req.session.user_id;
    const user = await User.findByPk(userId, {
      attributes: ["username", "id"],
      include: [{ model: Post }],
    });

    console.log("posts", posts);
    console.log("user", user);

    res.render("homepage", { posts, user });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
