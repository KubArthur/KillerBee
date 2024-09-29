require("dotenv").config();
const express = require("express");
const cors = require("cors");
const allowRequest = require("./middlewares/allowRequest");
const swaggerUi = require("swagger-ui-express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { mergeSwaggerFiles } = require("./swagger");

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

mergeSwaggerFiles().then((mergedSwagger) => {
  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(mergedSwagger));
});

app.listen(port, () => {
  console.log(`🚀 App running on http://localhost:${port}/api-docs`);
});
