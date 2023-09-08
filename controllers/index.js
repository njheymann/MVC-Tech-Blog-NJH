const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoute.js");
const homeRoutes = require("./homeRoute.js");
const signupRoutes = require("./signupRoute.js");
const dashboardRoutes = require("./dashBoardRoute.js");
const logout = require("./logout.js");

router.use("/login", userRoutes);
router.use("/signup", signupRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/logout", logout);

module.exports = router;
