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
    const user = await User.findByPk(userId);
    const posts = await Post.findAll({
      where: {
        user_id: userId,
      },
    });
    res.render("dashboard", { user, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
