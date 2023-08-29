const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
