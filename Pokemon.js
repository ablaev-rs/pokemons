const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    favorite: {
        type: Array
    }
})

const Users = mongoose.model('user', usersSchema);
module.exports = Users;