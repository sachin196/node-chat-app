const mongoose = require('mongoose');

var user = mongoose.model('user',{
    name: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    }
});

module.exports ={user};