const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
});

module.exports = mongoose.model('Request', requestSchema);