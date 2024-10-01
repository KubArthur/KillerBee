const axios = require("axios");
const { decrypt, encrypt } = require("./encryption");

const PROXY_TARGETS = {
  ms_modele: process.env.MS_MODELE_URL,
  ms_ingredient: process.env.MS_INGREDIENT_URL,
  ms_process: process.env.MS_PROCESS_URL,
};

const encryptionRequest = async (req, res) => {
  const urlPath = req.originalUrl.substring(5);
  const [serviceName, ...rest] = urlPath.split("/");
  const serviceUrl = PROXY_TARGETS[serviceName];

  if (!serviceUrl) {
    return res.status(404).send("Service not found");
  }

  const fullUrl = `${serviceUrl}/${rest.join("/")}`;

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const bodyDecrypted = decrypt(req.body);
      const bodySwap = JSON.parse(bodyDecrypted);

      const response = await axios.post(fullUrl, bodySwap, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = JSON.stringify(response.data);
      const messageCrypted = encrypt(message);

      res.status(200).send(messageCrypted);
    } catch (error) {
      console.error("Erreur lors de la requête directe:", error.message);
      res.status(500).send("Erreur lors de la requête directe au microservice");
    }
  }

  if (req.method === "DELETE") {
    try {
      const response = await axios.get(fullUrl);

      const message = JSON.stringify(response.data);
      const messageCrypted = encrypt(message);

      res.status(200).send(messageCrypted);
    } catch (error) {
      console.error("Erreur lors de la requête directe:", error.message);
      res.status(500).send("Erreur lors de la requête directe au microservice");
    }
  }

  if (req.method === "GET") {
    try {
      const response = await axios.get(fullUrl);

      const message = JSON.stringify(response.data);
      const messageCrypted = encrypt(message);

      res.status(200).send(messageCrypted);
    } catch (error) {
      console.error("Erreur lors de la requête directe:", error.message);
      res.status(500).send("Erreur lors de la requête directe au microservice");
    }
  }
};

module.exports = encryptionRequest;
