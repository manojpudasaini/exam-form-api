const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const db = require("./models");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));
app.use(bodyParser.json());
global.__basedir = __dirname + "/.";
const PORT = 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server is running at port ${PORT}`);
    try {
      await sequelize.authenticate();
      console.log("connection established successfully");
    } catch (error) {
      console.log("unable to connect to database", error);
    }
  });
});

const subjectRoutes = require("./routes/subject.route");
app.use("/api/v1/subject", subjectRoutes);
const studentRoutes = require("./routes/student.route");
app.use("/api/v1/student", studentRoutes);
