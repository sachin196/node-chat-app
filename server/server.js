const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const{generateMessage} = require('./utils/message');
const publicPath=path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io =socketIO(server);

app.use(express.static(publicPath));

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
  
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app.'));
    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    //   });
    
    socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User Joined'));
    //   socket.broadcast.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'New user joined',
    //     createdAt: new Date().getTime()
    //   });


      socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // return false;
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This Is From The Server');
        // io.emit('newMessage', {
        //   from: message.from,
        //   text: message.text,
        //   createdAt: new Date().getTime()
        // });
       });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});


server.listen(port, () => {
    console.log(`server is up on ${port}`)
});


























// console.log(__dirname +'/../public');
// console.log(publicPath);