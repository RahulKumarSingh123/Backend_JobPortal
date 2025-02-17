const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require("../middlewares/adminMiddleware");
const { applicationController, getApplicationsController } = require("../controllers/applicationController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.post("/upload/:id", authMiddleware, uploadMiddleware.single("image"), applicationController);
router.get('/get/:id', authMiddleware, adminMiddleware, getApplicationsController);
module.exports = router;