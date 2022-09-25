const express = require("express");
const router = express.Router();

const statusController = require("../controllers/status.controller");

router.put("/:id", statusController.postStaus);
router.get("/:id", statusController.getStatus);

module.exports = router;
