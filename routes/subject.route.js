const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/subject.controllers");
const uploadFile = require("../middlewares/upload");

router.post(
  "/upload",
  uploadFile.single("file"),
  subjectController.postSubjectDetails
);

router.get("/getall", subjectController.getSubjectDetails);
router.get("/get", subjectController.getSubjectByIdandSem);

router.put("/update/:code", subjectController.updateSubjectDetails);

module.exports = router;
