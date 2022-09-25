const db = require("../models");
const Status = db.status;

exports.postStaus = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    if (!req.body) {
      res.status(400).send({
        message: "content cannot be empty",
      });
      return;
    }
    await Status.update(
      {
        status: req.body.status,
        year: req.body.year,
        semester: req.body.semester,
      },
      {
        where: { id: id },
      }
    ).then((result) => {
      res.status(200).json(result);
      return;
    });
  } catch (error) {
    res.status(500).json(error?.message);
    return;
  }
};

exports.getStatus = async (req, res) => {
  const id = req.params.id;
  try {
    await Status.findOne({
      where: { id: id },
    }).then((result) => {
      res.json(result);
      return;
    });
  } catch (error) {
    return res.json(error);
  }
};
