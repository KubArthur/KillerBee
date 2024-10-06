const axios = require("axios");
const { decrypt, encrypt } = require("./encryption");

const PROXY_TARGETS = {
  ms_modele: process.env.MS_MODELE_URL,
  ms_ingredient: process.env.MS_INGREDIENT_URL,
  ms_process: process.env.MS_PROCESS_URL,
  ms_auth: process.env.MS_AUTH_URL,
};

const encryptionRequest = async (req, res, id_user) => {
  const urlPath = req.originalUrl.substring(5);
  const [serviceName, ...rest] = urlPath.split("/");
  let serviceUrl = "";

  if (urlPath === "mc_auth") {
    serviceUrl = process.env.MS_AUTH_URL;
  } else {
    serviceUrl = PROXY_TARGETS[serviceName];
  }
  
  if (!serviceUrl) {
    return res.status(404).send("Service not found");
  }

  const fullUrl = `${serviceUrl}/${rest.join("/")}`;

  const referer = process.env.ALLOWED_REFERER || "http://localhost:3000/api";

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const bodyDecrypted = decrypt(req.body);
      const bodySwap = JSON.parse(bodyDecrypted);

      let response;

      if (req.method === "POST") {
        response = await axios.post(fullUrl, bodySwap, {
          headers: {
            "Content-Type": "application/json",
            Referer: referer,
            Id_user: id_user,
          },
        });
      } else {
        response = await axios.put(fullUrl, bodySwap, {
          headers: {
            "Content-Type": "application/json",
            Referer: referer,
            Id_user: id_user,
          },
        });
      }

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
      const response = await axios.delete(fullUrl, {
        headers: {
          Referer: referer,
          Id_user: id_user,
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

  if (req.method === "GET") {
    try {
      const response = await axios.get(fullUrl, {
        headers: {
          Referer: referer,
          Id_user: id_user,
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
};

module.exports = encryptionRequest;
