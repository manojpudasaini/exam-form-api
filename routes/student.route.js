const express = require("express");
const router = express.Router();
 
const studentController=require("../controllers/student.controller")
router.post("/create",studentController.postStudentDetails)
router.get("/all",studentController.getAllStudentDetails)
router.get("/find/:symbolnumber",studentController.findOneStudent)
router.put("/update/:symbolnumber",studentController.updateStudentDetails)
router.delete("/delete/:symbolnumber",studentController.deleteStudentDetails)
router.delete("/deleteAll",studentController.deleteAllStudentsDetails)
 
 
module.exports = router;