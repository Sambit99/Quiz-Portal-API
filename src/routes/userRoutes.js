const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/addUser", userController.addUser);
router.get("/getAllUser", userController.getAllUser);

module.exports = router;