const express = require("express");
const router = express.Router();

const postRoutes = require("./postRoute.js");
const userRoutes = require("./userRoute.js");
const homeRoutes = require("./homeRoute.js");
const signupRoutes = require("./signupRoute.js");
const dashboardRoutes = require("./dashBoardRoute.js");

router.use("/posts", postRoutes);
router.use("/login", userRoutes);
router.use("/signup", signupRoutes);
router.use("/home", homeRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
