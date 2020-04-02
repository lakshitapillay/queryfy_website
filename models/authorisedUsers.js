const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorisedUserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    }
})

const AuthorisedUser = mongoose.model('AuthorisedUser', AuthorisedUserSchema);
module.exports = AuthorisedUser;