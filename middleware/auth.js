const Users = require('../models/usersDB');

const auth = async (req, res, next) => {
  const token = req.get("Authentication");

  if (!token) {
    res.status(401).send({ error: "Token not present" });
  }

  const user = await Users.findOne({ token });

  if (!user) {
    res.status(401).send({ error: "User not found" });
  }

  req.user = user;
  next();
};
 
module.exports = auth;
