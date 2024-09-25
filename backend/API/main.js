require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allowRequest = require("./middlewares/allowRequest");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT;

const PROXY_TARGETS = {
  ms_modele: process.env.MC_MODELE_URL,
  ms_ingredient: process.env.MC_INGREDIENT_URL,
  ms_process: process.env.MC_PROCESS_URL,
};

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
