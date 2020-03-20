const {Schema, model, Types} = require('mongoose');

const schema = Schema({
    link: {
        type: String,
        required: true,
        index:false,
        unique:false,
    },
    owner: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = model('Favorite', schema);