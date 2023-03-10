const express = require("express");

const router = express.Router();
const category = require("../controllers/category.controller.js");


router.get("/category", category.getAll);
router.get("/category/:catId", category.get)
router.post("/category", category.create);
router.delete("/category/:catId", category.delete);
router.put("/category/:catId", category.update);

module.exports = router; 