const mongoose = require("mongoose");
const config = require("./config");
const { nanoid } = require("nanoid");

const Artist = require("./models/artistDB");
const Album = require("./models/albumDB");
const Track = require("./models/trackDB");
const TrackHistory = require("./models/trackHistoryDB");
const User = require("./models/usersDB");

mongoose.connect(config.db.url + config.db.name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once("open", async () => {
  try {
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("track_histories");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [user, admin] = await User.create(
    {
      username: "user",
      password: "user@123",
      token: nanoid(),
    },
    {
      username: "admin",
      password: "admin@123",
      token: nanoid(),
    }
  );

  const [ritaOra, bebeRexha] = await Artist.create(
    {
      title: "Rita Ora",
      image: "RitaOra.jpg",
      description: "British singer, songwriter and actress",
    },
    {
      title: "Bebe Rexha",
      image: "Bebe.jpg",
      description: " American singer and songwriter",
    }
  );

  const [ritaOraAlbum, bebeRexhaAlbum] = await Album.create(
    {
      title: "Phoenix (Deluxe)",
      artist: ritaOra._id,
      year: "2018",
      cover: "Phoenix.png",
    },
    {
      title: "Expectations",
      artist: bebeRexha._id,
      year: "2018",
      cover: "Expectation.png",
    }
  );

  const [ritaOraTrack, bebeRexhaTrack] = await Track.create(
    {
      title: "New Look",
      album: ritaOraAlbum._id,
      long: "2:33",
      num: "1",
      youtube: "/Q6lXBSdup5Q",
    },
    {
      title: "Ferrari",
      album: bebeRexhaAlbum._id,
      long: "3:33",
      num: "2",
      youtube: "/nyRawESIuy4",
    }
  );

  await TrackHistory.create(
    {
      user: user._id,
      track: ritaOraTrack._id,
      datetime: "03.05.2021 04:55",
    },
    {
      user: admin._id,
      track: bebeRexhaTrack._id,
      datetime: "05.05.2021 18:22",
    }
  );

  db.close();
});
