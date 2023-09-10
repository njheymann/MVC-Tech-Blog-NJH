const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");

const isAuthenticated = (req, res, next) => {
  if (req.session.logged_in) {
    return next();
  }
  res.redirect("/login");
};

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const user = await User.findByPk(userId, {
      attributes: ["username"],
      include: [{ model: Post }],
    });

    console.log(user);

    res.render("dashboard", { user: user.get({ plain: true }) });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const postData = await Post.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    console.log(postData);
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    console.log(deletePost);
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
