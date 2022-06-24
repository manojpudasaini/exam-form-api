
const db=require("../models");
const subjectModel = require("../models/subject.model");
const Student=db.students;

 
exports.postStudentDetails=async(req,res)=>{
    if(!req.body){
        res.status(400).send({
            message:"content cannot be empty"
        })
        return;
    }
    console.log(req.body, "body")
const student={
    symbolnumber:req.body.symbolnumber,
    registrationnumber:req.body.registrationnumber,
    name:req.body.name,
    photo:req.body.photo,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone
}
const snumber = await Student.findByPk(student.symbolnumber)
  if (snumber === null) {
    
    await Student.create(student)
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send({
          message: err.message || "some error occurred while adding student",
        });
      });
  } else {
    res.status(400).send({
      message: "student already registered",
    });
  }
return;
}

exports.getAllStudentDetails=async (req,res)=>{
  try{
    const students=await Student.findAll()
    return res.json(students)
  }catch(err){
    console.log(err)
    return res.status(500).json({erroe:`something went wrong`})
  }
}




// exports.getAllStudentDetails = async (req, res) => {
//     await Student.findAll()
//       .then((students) => {
//         if (Student.length == 0) {
//           res.send("no students information ");
//         } else {
//           res.send(students);
//         }
//       })
//       .catch((error) => {
//         res.status(500).send({
//           message: error.message || "failed to fetch requested information",
//         });
//       });
//   };


 



  exports.updateStudentDetails=async (req, res)=>{
    const symbolnumber=req.params.symbolnumber;
    await Student.update(req.body,{
      where : {symbolnumber: symbolnumber}
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student Details updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Student with symbolnumber = ${symbolnumber}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating subject with student=" + symbolnumber
      });
    });
};


exports.deleteStudentDetails = async(req, res) => {
  const symbolnumber = req.params.symbolnumber;
  await Student.destroy({
    where: { symbolnumber: symbolnumber }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${symbolnumber}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Student with id=" + symbolnumber
      });
    });
  }

  exports.deleteAllStudentsDetails = async (req, res) => {
   await Student.destroy({
      where: {},
      truncate: true
    })
      .then(nums => {
        res.send({ message: `${nums} Students were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all students."
        });
      });
  };




  exports.findOneStudent =async (req, res) => {
    const symbolnumber = req.params.symbolnumber;
    await Student.findByPk(symbolnumber)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Student with symbolnumber=${symbolnumber}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Student with id=" + symbolnumber
        });
      });
  };