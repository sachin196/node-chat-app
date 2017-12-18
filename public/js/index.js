var socket = io();

    socket.on('connect',function () {
        console.log('connected to server');

        // socket.emit('createEmail', {
        //     to: 'jen@example.com',
        //     text: 'hey,this is andrew.'
        // });

        // socket.emit('createMessage', {
        //     to: 'jen',
        //     text: 'hey,this is andrew2.'
        // });
    });

    socket.on('disconnect', function() {
        console.log('disconnected from server');
    });

    // socket.on('newEmail', function (email) {
    //     console.log('new Email', email);
    // });

    
    socket.on('newMessage', function (Message) {
        console.log('newMessage', Message);
    });