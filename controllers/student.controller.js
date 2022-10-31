const db = require("../models");
const Student = db.students;
const { cloudinary } = require("../utils/cloudinary");
exports.postStudentDetails = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "content cannot be empty",
    });
    return;
  }
  console.log(req.body, "body");
  try {
    const Img = req.body.photo;
    var uploadedResponse = await cloudinary.uploader.upload(Img, {
      upload_preset: "exam-form-users",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message || "Error while uploading to cloudinary",
    });
    return;
  }
  const student = {
    symbolNumber: req.body.symbolNumber,
    registrationNumber: req.body.registrationNumber,
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    photo: uploadedResponse.url,
    email: req.body.email,
    password: req.body.password,
    program: req.body.program,
    phone: req.body.phone,
    firebase_id: req.body.firebase_id,
  };
  const snumber = await Student.findByPk(student.symbolNumber);
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
};

// exports.getAllStudentDetails = async (req, res) => {
//   try {
//     const students = await Student.findAll();
//     return res.json(students);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ erroe: `something went wrong` });
//   }
// };

exports.getAllStudentDetails = async (req, res) => {
  await Student.findAll()
    .then((students) => {
      if (Student.length == 0) {
        res.send("no students information ");
      } else {
        res.send(students);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "failed to fetch requested information",
      });
    });
};

exports.updateStudentDetails = async (req, res) => {
  const symbolnumber = req.params.symbolNumber;
  await Student.update(req.body, {
    where: { symbolNumber: symbolnumber },
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
        message: "Error updating subject with student=" + symbolnumber,
      });
    });
};

exports.deleteStudentDetails = async (req, res) => {
  const symbolnumber = req.params.symbolNumber;
  await Student.destroy({
    where: { symbolNumber: symbolnumber },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${symbolnumber}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Student with id=" + symbolnumber,
      });
    });
};

exports.deleteAllStudentsDetails = async (req, res) => {
  await Student.destroy({
    where: {},
    truncate: true,
  })
    .then((nums) => {
      res.send({ message: `${nums} Students were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students.",
      });
    });
};

exports.findOneStudent = async (req, res) => {
  const symbolnumber = req.params.symbolNumber;
  await Student.findByPk(symbolnumber)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with symbolnumber=${symbolnumber}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + symbolnumber,
      });
    });
};

exports.getStudentByFirebaseId = async (req, res) => {
  const f_id = req.params.f_id;
  await Student.findOne({ where: { firebase_id: f_id } })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find Student with symbolnumber=${f_id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Student with id=" + f_id,
      });
    });
};
