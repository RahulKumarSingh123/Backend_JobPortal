const express = require('express');
const router = express.Router();
const { registerController, loginController, changePasswordController } = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/register", registerController)
router.post("/login", loginController);
router.post("/change-password", authMiddleware, changePasswordController);

module.exports = router;