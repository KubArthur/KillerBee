const encryptionRequest = require("../encryptionRequest");

const allowRequest = (req, res) => {
  try {
    if (
      req.headers.origin.startsWith(process.env.ALLOWED_ORIGIN)
    ) {
      encryptionRequest(req, res);
    }
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = allowRequest;
