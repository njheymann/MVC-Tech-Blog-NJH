const router = require("express").Router();

const postRoutes = require("./postRoute.js");
const userRoutes = require("./userRoute.js");
const dashBoardRoutes = require("./dashBoardRoute.js");

router.use("/posts", postRoutes);
router.use("/dashboard", dashBoardRoutes);

module.exports = router;
