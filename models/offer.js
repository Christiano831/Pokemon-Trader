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
    // commentUserId: {
    //     type:Schema.Types.ObjectId
    // }
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
    comments: [commentsSchema],
});

offersSchema.virtual('baseURL').get(function(){
    return 'https://pokeapi.co/api/v2/pokemon/' + this.pokemonOffer + '/';
});

module.exports = mongoose.model('Offer', offersSchema);