const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "track",
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
});

const TrackHistory = mongoose.model("track_history", TrackHistorySchema);
module.exports = TrackHistory;
