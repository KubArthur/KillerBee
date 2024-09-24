require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const modeleRouter = require("./controllers/modeleController");
const allowRequest = require("./middlewares/allowRequest");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(allowRequest);

app.use("/", modeleRouter);

app.listen(port, () => {
  console.log(`🚀 App running on http://localhost:${port}`);
});
