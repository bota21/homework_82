const express = require("express");
const Users = require("../models/usersDB");
const router = express.Router();

const createRouter = () => {
  router.post("/", async (req, res) => {
    try {
      const user = new Users(req.body);
      user.generateToken();
      console.log(user);
      await user.save();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.post("/sessions", async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).send("Wrong username or password");
    }
 
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send("Wrong username or password");
    }
    user.generateToken();
    await user.save({validateBeforeSave: false});
    return res.send(user);
  });

  return router;
};

module.exports = createRouter;
