require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ingredientRouter = require("./controllers/ingredientController");
const ingredientTestRouter = require("./controllers/ingredientTestController");
const allowRequest = require("./middlewares/allowRequest");
const sequelize = require("./config/db");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(allowRequest);
app.use(express.urlencoded({ extended: true }));

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"))
);

app.use("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocument);
});


app.use("/test", ingredientTestRouter);
app.use("/", ingredientRouter);

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
