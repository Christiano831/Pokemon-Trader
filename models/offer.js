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
    pokemonId: {type: String},
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
    pokemonRequestId: {type: String},
    comments: [commentsSchema],
    newOfferURL: {type: String},
    newRequestURL: {type: String}
});

const opts = {toJSON: {virtuals: true}}
offersSchema.virtual('baseURL').get(function(){
    return 'https://pokeapi.co/api/v2/pokemon/' + this.pokemonOffer.toLowerCase() + '/';
}, opts);

module.exports = mongoose.model('Offer', offersSchema);