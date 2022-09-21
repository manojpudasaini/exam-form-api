const express = require("express");
const router = express.Router();

const formController = require("../controllers/form.controller");

router.post("/create-form", formController.createForm);

module.exports = router;
