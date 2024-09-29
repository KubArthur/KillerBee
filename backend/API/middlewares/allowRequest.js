const allowRequest = (req, res, next) => {
  try {
    if (
      req.originalUrl.startsWith("/api/") ||
      req.headers.referer.includes("/api") ||
      req.headers.origin.startsWith(process.env.ALLOWED_ORIGIN)
    ) {
      next();
    }
  } catch (err) {
    res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = allowRequest;
