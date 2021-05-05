const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const multer = require("multer");
const artist = require("../models/artistDB");
const config = require("../config");
const path = require("path");
const auth = require("../middleware/auth");


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
  router.get("/", auth, async (req, res) => {
    try {
      const results = await artist.find();
      res.send(results);
    } catch {
      res.sendStatus(500);
    } 
  });
  router.get("/:id", auth, async (req, res) => {
    try {
      const results = await artist.findById(req.params.id);
      res.send(results);
    } catch {
      res.sendStatus(500); 
    }
  });
  router.post("/", auth, uploads.single("image"), async (req, res) => {
    try {
      const result = { ...req.body };
      const oldArtist = await artist.findOne({title: req.body.title});
      if(!oldArtist) {
        const newArtist = new artist(result);
        if (req.file) {
          newArtist.image = req.file.filename;
        };
        await newArtist.save();
        res.send(newArtist); 
      } else res.send({ message: "Artist has been already created" });
            
    } catch {
      res.sendStatus(404);
    }
  });
  router.put("/:id", auth, uploads.single("image"), async (req, res) => {
    try {
      const result = { ...req.body };
      const newArtist = await artist.findByIdAndUpdate(req.params.id, result);
      res.send(newArtist);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  router.delete("/:id", auth, async (req, res) => {
    try {
      await artist.findByIdAndDelete(req.params.id);
      res.send(`Artist with id ${req.params.id} deleted successfully`);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
