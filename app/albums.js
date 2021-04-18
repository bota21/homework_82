const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const multer = require("multer");
const path = require("path");
const album = require("../models/albumDB");

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
      const results = await album.find();
      res.send(results);
    } catch {
      res.sendStatus(500);
    }
  });
  router.post("/", uploads.single("image"), async (req, res) => {
    try {
      const result = { ...req.body };
      const newAlbum = new album(result);
      if (req.file) {
        newAlbum.image = req.file.filename;
      }
      res.send(newAlbum);
    } catch {
      res.sendStatus(404);
    }
  });
  return router;
};

module.exports = createRouter; 