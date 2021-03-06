const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const artists = require("./app/artists");
const albums = require("./app/albums");
const tracks = require("./app/tracks");
const users = require('./app/users');
const trackHistory = require('./app/trackHistories');
const config = require('./config');

const port = 2100;

const run = async () => {
  await mongoose.connect(config.db.url + config.db.name, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true 
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  app.use("/artists", artists());
  app.use("/albums", albums());
  app.use("/tracks", tracks());
  app.use("/users", users());
  app.use('/track_history', trackHistory());

  app.listen(port, () => {
    console.log("Server started at port " + port);
  });
};
run().catch((e) => console.log(e));
