const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestCommentsSchema = new Schema({
    text: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const requestSchema = new Schema({
    pokemonOffer: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    gameUserName: {
        type: String
    },
    pokemonRequest: {
        type: String
    },
    comments: [requestCommentsSchema],
});

module.exports = mongoose.model('Request', requestSchema);