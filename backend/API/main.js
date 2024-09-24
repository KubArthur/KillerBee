require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allowRequest = require("./middlewares/allowRequest");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PROXY_TARGETS = {
  mc_modele: process.env.MC_MODELE_URL,
  mc_ingredient: process.env.MC_INGREDIENT_URL,
  mc_fabrication: process.env.MC_FABRICATION_URL,
};

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use("/api/*", (req, res, next) => {
  allowRequest(req, res, next);
});

Object.entries(PROXY_TARGETS).forEach(([path, target]) => {
  app.use(
    `/api/${path}`,
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
});

app.listen(port, () => {
  console.log(`🚀 App running on http://localhost:${port}`);
});
