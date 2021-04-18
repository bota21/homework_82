const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = {
  title: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "album",
  },
  long: {
    type: String,
    required: true,
  },
};

const Track = mongoose.model("track", TrackSchema);
module.exports = Track;
