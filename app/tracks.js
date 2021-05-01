const express = require("express");
const router = express.Router();
const track = require("../models/trackDB");

const createRouter = () => {

  router.get("/", async (req, res) => {
    try {
      const results = await track
        .find()
        .populate({ path: "album", populate: { path: "artist" } });
      if (req.query.album) {
        const queryAlbum = await track
          .find({
            album: { _id: req.query.album },
          })
          .populate({ path: "album", populate: { path: "artist" } })
          .sort({ num: 1 });
        return res.send(queryAlbum);
      }
      return res.send(results);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const results = await track.findById(req.params.id).populate("album");
      res.send(results);
    } catch (e) {
      res.status(500).send(e);
    }
  });

  router.post("/", async (req, res) => {
    const arr = [];
    const albums = await track.find({ album: req.body.album });
    if (albums.length !== 0) {
      albums.filter((num) => {
         arr.push(num.num);
      });
    } else arr.push(0);
    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }
    const maxNum = getMaxOfArray(arr);
    try {
      const oldTrack = await track.findOne({ title: req.body.title });
      if (oldTrack) {
        res.send({ message: "Track already been created" });
      } else {
        const newTrack = new track(req.body);
        newTrack.num = maxNum + 1;
        await newTrack.save();
        res.send(newTrack);
      }
    } catch (e) {
      res.status(404).send(e);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const result = { ...req.body };
      const newTrack = await track.findByIdAndUpdate(req.params.id, result);
      res.send(newTrack);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await track.findByIdAndDelete(req.params.id);
      res.send(`Track with id ${req.params.id} deleted successfully`);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  return router;
};

module.exports = createRouter;
