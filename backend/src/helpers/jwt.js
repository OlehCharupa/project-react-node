const jwt = require("jsonwebtoken");
const User = require("./../app/models/userModel");
const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(payload.userId);
      if (user === null) {
        throw { error: 401, message: "Not authorized" };
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      res.status(err.hasOwnProperty("error") ? err.error : 401).send({
        message: err.hasOwnProperty("message") ? err.message : "Not authorized",
      });
    }
  } else {
    res.status(401).send({ message: "Not authorized" });
  }
};
exports.authenticateJWT = authenticateJWT;
