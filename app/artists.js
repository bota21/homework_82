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
    const results = await artist.find();
    res.send(results);
  });
  router.post("/", uploads.single("image"), async (req, res) => {
    const result = { ...req.body };
    const newArtist = new artist(result);
    if (req.file) {
      newArtist.image = req.file.filename;
    }
    res.send(newArtist);
  });
  return router;
};

module.exports = createRouter;

