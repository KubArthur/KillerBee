const allowRequest = (req, res, next) => {
  try {
    if (req.headers.referer.startsWith(process.env.ALLOWED_REFERER)) {
      next();
    }
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = allowRequest;
