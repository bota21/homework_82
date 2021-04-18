const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const multer = require("multer");
const path = require("path");
const config = require('../config'); 
const album = require("../models/albumDB");
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cd) => {
    cd(null, nanoid() + path.extname(file.originalname));
  },
});

const uploads = multer({ storage });

const createRouter = () => {
  router.get("/", async (req, res) => {
    try {
      const results = await album.find().populate('artist');
     if(req.query.artist) {
       const queryArtist = await album.find({artist: {_id: {$eq: req.query.artist} }});
      res.send(queryArtist);
     } 
      res.send(results); 
    } catch (e) {
      res.status(500).send(e);
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const results = await album.findById(req.params.id).populate('artist');
      res.send(results);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  router.post("/", uploads.single("cover"), async (req, res) => {
    try {
      const result = { ...req.body };
      const newAlbum = new album(result);
      if (req.file) {
        newAlbum.cover = req.file.filename;
      }
      await newAlbum.save();
      res.send(newAlbum);
    } catch (e){
      res.status(404).send(e); 
    }
  });
  return router;
};

module.exports = createRouter; 