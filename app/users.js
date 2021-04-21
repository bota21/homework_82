const express = require("express");
const Users = require("../models/usersDB");
const router = express.Router();

const createRouter = () => {
  router.post("/", async (req, res) => {
    try {
      const user = new Users(req.body);
      user.generateToken();
      await user.save();
      return res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.post("/session", async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send("User not found");
    };

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send("Wrong password");
    };

    return res.send("Authentication passed");
  });

  return router;
};

module.exports = createRouter;
