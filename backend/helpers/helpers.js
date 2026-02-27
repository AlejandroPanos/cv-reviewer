/* Create imports */
const jwt = require("jsonwebtoken");

/* Create helpers */
const maxAge = 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

/* Export helpers */
module.exports = { maxAge, createToken };
