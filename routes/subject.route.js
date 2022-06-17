const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/subject.controllers");
const uploadFile = require("../middlewares/upload");

router.post(
  "/upload",
  uploadFile.single("file"),
  subjectController.postSubjectDetails
);

router.get("/", subjectController.getSubjectDetails);

router.put("/:code", subjectController.updateSubjectDetails);

module.exports = router;
