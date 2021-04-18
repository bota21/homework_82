const express = require("express");
const router = express.Router();
const track = require("../models/trackDB");

const createRouter = () => {
  router.get("/", async (req, res) => {
    try {
      const results = await track.find().populate('album');
      if(req.query.album) {
        const queryAlbum =  track.find({album: {_id: {$eq: req.query.album} }});
       res.send(queryAlbum);
      }
      res.send(results);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  router.post("/", async (req, res) => {
    try {
      const result = { ...req.body };
      const newTrack = new track(result);
      await newTrack.save();
      res.send(newTrack);
    } catch (e) {
      res.status(404).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
