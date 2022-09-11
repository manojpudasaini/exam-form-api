const { Op } = require("sequelize");
const readXlsxFile = require("read-excel-file/node");
const db = require("../models");
const Subject = db.subjects;
const Barrier = db.barriers;
const Concurrent = db.concurrents;

// exports.postSubjectDetails = async (req, res) => {
//   if (!req.body) {
//     res.status(400).send({
//       message: "content cannot be empty",
//     });
//     return;
//   }
//   const subject = {
//     code: req.body.code,
//     name: req.body.name,
//     credits: req.body.credits,
//     program: req.body.program,
//     semester: req.body.semester,
//     hasBarrier: req.body.barrier ? true : false,
//     hasConcurrent: req.body.concurrent ? true : false,
//     barrier: req.body.barrier,
//     concurrent: req.body.concurrent,
//   };

//   const subCode = await Subject.findByPk(subject.code);

//   if (subCode === null) {
//     await Subject.create(subject)
//       .then((result) => res.send(result))
//       .catch((err) => {
//         res.status(500).send({
//           message: err.message || "some error occurred while adding subject",
//         });
//       });
//   } else {
//     res.status(400).send({
//       message: "subject code already registered",
//     });
//     return;
//   }

//   if (subject.hasBarrier) {
//     await Barrier.create({
//       barrier: subject.barrier,
//       SubjectCode: subject.code,
//     });
//   }
// };

exports.postSubjectDetails = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then(async (rows) => {
      // skip header
      rows.shift();

      let subjects = [];
      let barrierSubjects = [];
      let concurrentSubjects = [];
      rows.forEach((row) => {
        let subject = {
          name: row[0],
          code: row[1],
          credits: row[2],
          concurrent: row[3],
          barrier: row[4],
          semester: row[5],
          program: "BEIT",
          hasBarrier: row[4] ? true : false,
          hasConcurrent: row[3] ? true : false,
        };
        subjects.push(subject);
        if (subject.hasBarrier) {
          barrierList = {
            barrier: subject.barrier,

            code: subject.code,
          };
          barrierSubjects.push(barrierList);
        }
        if (subject.hasConcurrent) {
          concurrentList = {
            concurrent: subject.concurrent,
            code: subject.code,
          };
          concurrentSubjects.push(concurrentList);
        }
      });
      await Subject.bulkCreate(subjects)
        .then(async () => {
          await Barrier.bulkCreate(barrierSubjects);
          await Concurrent.bulkCreate(concurrentSubjects);
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

exports.getSubjectDetails = async (req, res) => {
  await Subject.findAll({
    order: [["semester", "ASC"]],
    include: ["barriers", "concurrents"],
  })
    .then((subjects) => {
      if (subjects.length == 0) {
        res.send("no subjects information ");
      } else {
        res.send(subjects);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "failed to fetch requested information",
      });
    });
};

exports.getByCode = async (req, res) => {
  const code = req.params.code;
  await Subject.findOne({
    where: { code: code },
    include: ["barriers", "concurrents"],
  })
    .then((subjects) => {
      res.send(subjects);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "failed to fetch requested information",
      });
    });
};

exports.updateSubjectDetails = async (req, res) => {
  const code = req.params.code;
  console.log(code, "code from uri");
  await Subject.update(req.body, {
    where: { code: code },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Subject Details updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update Subject with code = ${code}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating subject with code=" + code,
      });
    });
};

exports.getSubjectByIdandSem = async (req, res) => {
  const sub = req.query;
  // console.log("req query", code);
  await Subject.findAll({
    where: { code: sub.code, semester: sub.semester },
    order: [["semester", "ASC"]],
    include: ["barriers", "concurrents"],
  })
    .then((subjects) => {
      res.json({ data: subjects });
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || "failed to fetch requested information",
      });
    });
};

exports.getSubjectsUptoSem = async (req, res) => {
  const sem = req.params.sem;
  await Subject.findAll({
    where: { semester: { [Op.lt]: sem } },
    order: [["semester", "ASC"]],
    include: ["barriers", "concurrents"],
  })
    .then((subjects) => {
      res.json({ data: subjects });
      return;
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
      return;
    });
};

exports.getSubjectsBySem = async (req, res) => {
  const sem = req.params.sem;
  await Subject.findAll({
    where: { semester: sem },
    order: [["semester", "ASC"]],
    include: ["barriers", "concurrents"],
  })
    .then((subjects) => {
      res.json({ data: subjects });
      return;
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message,
      });
      return;
    });
};
