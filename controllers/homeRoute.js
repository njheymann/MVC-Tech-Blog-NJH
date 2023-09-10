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
      ],
      attributes: ["title", "content", "user_id"],
    });

    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      attributes: ["id", "comment_text", "user_id", "post_id"],
    });

    const posts = {
      posts: postData.map((post) => post.get({ plain: true })),
      comments: comments.map((comment) => comment.get({ plain: true })),
    };

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

module.exports = router;
