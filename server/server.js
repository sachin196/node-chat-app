// Import all our dependencies
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
// const bodyParser =require('body-parser');
// const {mongoose} =require('./db/mongoose');
// const {user} = require('./models/collection-user');

const{generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');
const publicPath=path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io =socketIO(server);
var users = new Users();
// app.use(require('express-uncapitalize')());

// tell express where to serve static files from
app.use(express.static(publicPath));
// mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");

io.on('connection', (socket) => {
    console.log('New user connected');
     
    // socket.emit('newEmail', {
    //  from: 'nike@example.com',
    //  text: 'hey, What is going on.',
    //  createdAt:123
    // });

    // socket.on('createEmail', (newEmail) => {
    //  console.log('createEmail', newEmail);
    // });

    // socket.emit('newMessage', {
    //     from: 'nike',
    //     text: 'hey, What is going on.',
    //    });
  
    //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app.'));
    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    //   });
    
    //socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Joined'));
    //   socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    //   });
   

   
    io.emit('getallRoomList', users.getallRoomList());
     socket.on('join',(params, callback) => {
     if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and Room are required');
     }
     if(users.addUser(socket.id, params.name, params.room) == false ) {
        return callback('Username Already exists');
     }

    //  io.sockets.on('connection', function(socket) {
    //     // once a client has connected, we expect to get a ping from them saying what room they want to join
    //     socket.on('room', function(room) {
    //         socket.join(room);
    //     });
    // });
     socket.join(params.room.toLowerCase());
     console.log(params.room);
     users.removeUser(socket.id);
     users.addUser(socket.id, params.name, params.room);

     io.to(params.room.toLowerCase()).emit('updateUserList', users.getUserList(params.room));
     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app.'));
     socket.broadcast.to(params.room.toLowerCase()).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));
     callback();
     });
    
      socket.on('createMessage', (message, callback) => {
          var user = users.getUser(socket.id);

          if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
          }
        // console.log('createMessage', message);
        // return false;
       
        callback();
        // io.emit('newMessage', {
        //   from: message.from,
        //   text: message.text,
        //   createdAt: new Date().getTime()
        // });
       });

       socket.on('createLocationMessage', (coords) => {
           var user = users.getUser(socket.id);
           if(user) {
             io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
           }
       });

    socket.on('disconnect', () => {
        // console.log('User was disconnected');
        var user = users.removeUser(socket.id);

        if(user) {
            io.emit('getallRoomList', users.getallRoomList());
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`server is up on ${port}`)
});


























// console.log(__dirname +'/../public');
// console.log(publicPath);