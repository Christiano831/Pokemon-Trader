const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    text: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const offersSchema = new Schema({
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
    comments: [commentsSchema]
});

module.exports = mongoose.model('Offer', offersSchema);