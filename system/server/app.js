const express = require("express");
const sequelizeConnect = require("./connection/database");
const bodyParser = require("body-parser");
const routes = require("./routes/main-route");
const cors = require("./util/cors");
const serverError = require("./util/server-error");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/assets", express.static("public"));
app.use("/api", cors, routes);
app.use(serverError);
app.use("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Resource unavailable." });
});
app.use(routes);

const testDatabaseConnection = async () => {
  try {
    await sequelizeConnect.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

sequelizeConnect
  .sync({
    //force: true,
  })
  .then(() => {
    testDatabaseConnection().then(() => {
      app.listen(port, () => {
        console.log(`Server started @ PORT ${port}`);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
