const mongoose = require("mongoose");

const {Schema} = mongoose;
const photo = new Schema({
    id: {
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
            layoutOrder: {
                type: Number
            },
            createAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = photo;