const express = require("express");
const app = express();
const cors = require("cors");
const artists = require("./app/artists");
const mongoose = require("mongoose");
const albums = require("./app/albums");
const tracks = require("./app/tracks");

const port = 2100;

const run = async () => {
  await mongoose.connect("mongodb://localhost/artist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  app.use("/artists", artists());
  app.use("/albums", albums());
  app.use("/tracks", tracks());

  app.listen(port, () => {
    console.log("Server started at port " + port);
  });
};
run().catch((e) => console.log(e));
