const mongoose = require("mongoose");

const {Schema} = mongoose;
const album = new Schema({
    userID: String,
    userAlbum: [
        {
            title: String,
            albumTumbnail: String,
            imgCount: Number,
        }
    ],
    dateAlbum: [
        {
            title: String,
            albumTumbnail: String,
            imgCount: Number,
        }
    ]
});

module.exports = album;