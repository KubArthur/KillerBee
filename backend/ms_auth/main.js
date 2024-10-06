require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authController = require("./controllers/authController");
const allowRequest = require("./middlewares/allowRequest");
const sequelize = require("./config/db");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(allowRequest);
app.use(express.urlencoded({ extended: true }));

app.use("/", authController);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("All models were synchronized successfully.");
    app.listen(port, () =>
      console.log(`🚀 App running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.error("Unable to synchronize the models:", err);
  });
