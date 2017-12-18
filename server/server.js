const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath=path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io =socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
     
    // socket.emit('newEmail', {
    //  from: 'nike@example.com',
    //  text: 'hey, What is going on.',
    //  createdAt:123
    // });

    // socket.on('createEmail', (newEmail) => {
    //  console.log('createEmail', newEmail);
    // });

    socket.emit('newMessage', {
        from: 'nike',
        text: 'hey, What is going on.',
       });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
       });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




server.listen(port, () => {
    console.log(`server is up on ${port}`)
});


























// console.log(__dirname +'/../public');
// console.log(publicPath);