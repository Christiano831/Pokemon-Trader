const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    pokemonOffer: {
        type: String
    },
    pokemonRequest: {
        type: String
    }
});

module.exports = mongoose.model('Request', requestSchema);