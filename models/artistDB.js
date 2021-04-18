const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "track",
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "album",
  },
});

const Artist = mongoose.model("artist", ArtistSchema);
module.exports = Artist;

