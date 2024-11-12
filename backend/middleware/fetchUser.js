var jwt = require("jsonwebtoken");
const JWT_SECRET = "Bhoomiiscreatingaapp";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please use a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).send({ error: "Please use a valid token" });
  }
};

module.exports = fetchUser;
