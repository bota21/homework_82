const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'artist',
        required: true
    },
    year: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    }
});

const Album = mongoose.model('album', AlbumSchema);
module.exports = Album;