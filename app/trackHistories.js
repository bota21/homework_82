const express = require("express");
const router = express.Router();
const trackHistory = require("../models/trackHistoryDB");
const auth = require("../middleware/auth");

const createRouter = () => {
  router.get("/", auth, async (req, res) => {
    try {
      const history = await trackHistory.find({ user: req.user._id }).populate({path: 'track', populate: { path: "album", populate: { path: "artist" }}}).sort({datetime: -1});
      res.send(history);
    } catch (e) {
      res.send(e);
    }
  });
  router.post("/", auth, async (req, res) => {
    try {
      const result = new trackHistory(req.body);
      result.user = req.user._id;
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth() + 1;
      const hour = now.getHours();
      const minute = now.getMinutes();
      const dateStr = (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month  + '.' + now.getFullYear() + ' ' + (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;
      result.datetime = dateStr;
      result.track = req.body.track;
      await result.save();
      res.send(result);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
