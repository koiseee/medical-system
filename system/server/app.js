const express = require("express");
const sequelizeConnect = require("./connection/database");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const routes = require("./routes/main-route");
const cors = require("./util/cors");
const serverError = require("./util/server-error");

const app = express();
app.use(bodyParser.json());
app.use("/assets", express.static("public"));
app.use("/api", cors, routes);
app.use(serverError);
app.use("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Resource unavailable." });
});
app.use(routes);

sequelizeConnect
  .sync({
    //force: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started @ PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

const port = process.env.PORT;
