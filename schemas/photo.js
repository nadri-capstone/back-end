const mongoose = require("mongoose");

const {Schema} = mongoose;
const photo = new Schema({
    id: {
        type: String
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    thumnail: {
        type: String
    },
    tags: [
        { 
            tag: {
                type: String
            },
            obj: {
                type: String
            }
        }
    ],
    comment: {
        type: String
    },
    pages: [
        {
            page: {
                type: String
            },
            pagePosition: {
                type: Number
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = photo;