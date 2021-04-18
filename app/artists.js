const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const multer = require("multer");
const artist = require("../models/artistDB");
const config = require("../config");
const path = require("path");

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
      const results = await artist.find();
      res.send(results);
    } catch {
      res.sendStatus(500);
    }
  });
  router.post("/", uploads.single("image"), async (req, res) => {
    try {
      const result = { ...req.body };
      const newArtist = new artist(result);
      if (req.file) {
        newArtist.image = req.file.filename;
      }
      await newArtist.save();
      res.send(newArtist);
    } catch {
      res.sendStatus(404);
    }
  });
  return router;
};

module.exports = createRouter;
