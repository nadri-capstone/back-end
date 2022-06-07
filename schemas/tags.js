const mongoos = require('mongoose');

const {Schema} = mongoos;
const tags = new Schema({
    userID: String,
    tag1: {
        type: Number,
        default: 0
    },
    tag2: {
        type: Number,
        default: 0
    }
});

module.exports = tags;