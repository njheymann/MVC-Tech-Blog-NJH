const express = require("express");
const router = express.Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  // render login.handlebars
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // Find the user based on the username
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ message: "Login successful" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
