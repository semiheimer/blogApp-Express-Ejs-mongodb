const jwt = require("jsonwebtoken");
const verifyAccessJWT = (token) => {
  const decoded = jwt.verify(token, process.env.ACCESS_KEY);
  return decoded;
};
const verifyRefreshJWT = (token) => {
  const decoded = jwt.verify(token, process.env.REFRESH_KEY);
  return decoded;
};

const createAccessJWT = (payload) => {
  const token = jwt.sign(payload, process.env.ACCESS_KEY, {
    expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
  });
  return token;
};

const createRefreshJWT = (payload) => {
  const token = jwt.sign(payload, process.env.REFRESH_KEY, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
  return token;
};
module.exports = {
  verifyAccessJWT,
  verifyRefreshJWT,
  createAccessJWT,
  createRefreshJWT,
};
