const express = require("express");
const router = express.Router();
const track = require("../models/trackDB");

const createRouter = () => {
  router.get("/", async (req, res) => {
    try {
      const results = await track.find().populate("album");
      if (req.query.album) {
        const queryAlbum = await track.find({
          album: { _id: req.query.album },
        });
        res.send(queryAlbum);
      };
      res.send(results);
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
    try {
      const result = { ...req.body };
      const oldTrack = track.findOne({ title: req.body.title });
      if (!oldTrack) {
        const newTrack = new track(result);
        await newTrack.save();
        res.send(newTrack);
      } else res.send({ message: "Track has been already created" });
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
