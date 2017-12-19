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

    
    socket.on('newMessage', function (message) {
        console.log('newMessage', message);
        var li=jQuery('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        jQuery('#messages').append(li);
      });

    //   socket.emit('createMessage', {
    //     from: 'frank',
    //     text: 'hii'
    //    },function(data){
    //        console.log('Got it',data);
    //    });

       jQuery('#message-form').on('submit', function (e) {
        e.preventDefault();

        socket.emit('createMessage' ,{
            from : 'User',
            text : jQuery('[name=message]').val()
          }, function(){
          
        }); 
       });
      
     