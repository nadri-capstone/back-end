const mongoose = require("mongoose");

const {Schema} = mongoose;
const photo = new Schema({
    uri: {
        type: String
    },
    datetime: {
        type: Date
    },
    location: {
        type: Object    
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
            pageOrder: {
                type: Number
            },
            layoutOrder: {
                type: Number
            }
        }
    ],
}, {
    timestamps: true,
});

module.exports = photo;