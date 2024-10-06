const encryptionRequest = require("../encryptionRequest");
const jwt = require("jsonwebtoken");

const allowRequest = (req, res) => {
  try {
    if (req.headers.origin.startsWith(process.env.ALLOWED_ORIGIN)) {
      if (req.originalUrl === "/api/mc_auth") {
        encryptionRequest(req, res);
      } else {
        const token = req.headers["authorization"];

        if (!token) {
          return res.status(444);
        }

        try {
          const token = req.headers.authorization.split(" ")[1];

          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          
          encryptionRequest(req, res, decoded.id);
        } catch (err) {
          return res.status(444).send({ message: "Failed to refresh token." });
        }
      }
    }
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = allowRequest;
