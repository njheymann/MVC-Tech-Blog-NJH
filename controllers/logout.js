const express = require("express");
const router = express.Router();
const { User, Comment, Post } = require("../models");

router.get("/", (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.redirect("/login");
    }
  });

module.exports = router;