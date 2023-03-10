const express = require("express");

const router = express.Router();
const users = require("../controllers/users.controller.js");


router.get("/users", users.getAll);
router.get("/users/:userId", users.get)
router.post("/users", users.create);
router.delete("/users/:userId", users.delete);
router.put("/users/:userId", users.update);
router.post("/users/login", users.login)

module.exports = router; 