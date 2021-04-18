const express = require("express");
const app = express();
const cors = require("cors");
const artists = require("./app/artists");
const mongoose = require("mongoose");

const port = 2100;

const run = async () => {
  await mongoose.connect("mongodb://localhost/artist", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.use(cors());
  app.use(express.json());
  app.use("/artists", artists());

  app.listen(port, () => {
    console.log("Server started at port " + port);
  });
};
run().catch((e) => console.log(e));

