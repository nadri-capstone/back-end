const mongoose = require('mongoose');

const {Schema} = mongoose;
const testSchema = new Schema({
    tname: {
        type: String
    },
    today: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ntest', testSchema);