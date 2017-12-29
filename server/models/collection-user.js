const mongoose = require('mongoose');
 const Schema =mongoose.Schema;

var chatUserSchema = new Schema({
    Display_name:{
      type:String,
    
     
    },
    Room_name:{
      type:String,
      
    }
    });

 const chatUser = mongoose.model('chatUser',chatUserSchema);
  module.exports = {chatUser};




// var mongoose = require('mongoose');
// var jwt = require('jsonwebtoken');
// const _ =require('lodash');

// var chatUserSchema =new mongoose.Schema({
//         name: {
//             type: String,
//             // required: true,
//              unique : true
//         }, 
//         roomName :{
//             type: String,
//             // required: true,
//         },
//         tokens : [{
//             access : {
//                 type: String,
//                 // required : true
//             },
//             token : {
//                 type: String,
//                 // required : true
//             }
//         }]
// },{ usePushEach: true });

// chatUserSchema.methods.generateAuthToken = function(){
//     var user = this;
//     var access = 'auth';
//     var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();//process.env.JWT_SECRET
    
//     user.tokens.push({access, token});
//     return user.save().then(() => {
//         return token;
//     });
//     };

// var chatUser = mongoose.model('chatUser', chatUserSchema);

// module.exports ={chatUser};
