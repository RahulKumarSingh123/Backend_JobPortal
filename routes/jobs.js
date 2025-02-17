const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const jobController = require("../controllers/jobController");

const router = express.Router();

router.post("/add", authMiddleware, adminMiddleware, jobController);

module.exports = router;