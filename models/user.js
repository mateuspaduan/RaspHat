var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const user = mongoose.model('Users', UserSchema);
module.exports = user;