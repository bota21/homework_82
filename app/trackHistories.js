const express = require("express");
const router = express.Router();
const trackHistory = require("../models/trackHistoryDB");
const User = require("../models/usersDB");

const createRouter = () => {
  router.post("/", async (req, res) => {
    const token = req.get("Authorization");
    if (!token) {
      return res.status(401).send("No token present");
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const result = new trackHistory(req.body);
    const currentUser = await User.findOne({ token });
    result.user = currentUser._id;
    result.datetime = new Date();
    res.send(result);
    result.save();
  });
  return router;
};

module.exports = createRouter;
