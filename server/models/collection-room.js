var mongoose = require('mongoose');

var chatRooom = mongoose.model('chatRooom', {
        roomName : {
            type: String,
            required : true
        },
        tokens : [{
            access : {
                type: String,
                required : true
            },
            token : {
                type: String,
                required : true
            }
        }]
    });

    module.exports ={chatRooom};