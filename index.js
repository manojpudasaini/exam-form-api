const express = require("express");
const { sequelize } = require("./models");
const db = require("./models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
