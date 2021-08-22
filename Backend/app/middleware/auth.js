const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.config");

const verifyToken = (req, res, next) => {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "Access token is required for authentication" });
  }
  try {
    jwt.verify(token, authConfig.secretKey);
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  return next();
};

module.exports = verifyToken;
