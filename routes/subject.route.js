const express = require("express");
const router = express.Router();

const subjectController = require("../controllers/subject.controllers");
const uploadFile = require("../middlewares/upload");

router.post(
  "/upload",
  uploadFile.single("file"),
  subjectController.postSubjectDetails
);

router.get("/getbycode/:code", subjectController.getByCode);
router.get("/getall", subjectController.getSubjectDetails);
router.get("/get", subjectController.getSubjectByIdandSem);
router.get("/getcodecredit", subjectController.getCodeCredit);
router.get("/getuptosem/:sem", subjectController.getSubjectsUptoSem);
router.get("/getbysem/:sem", subjectController.getSubjectsBySem);
router.get("/getcurrentsem/:sem", subjectController.getSubjectsForCurrentSem);
router.put("/update/:code", subjectController.updateSubjectDetails);

module.exports = router;
