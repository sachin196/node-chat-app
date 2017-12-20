var socket = io();
     
    function  scrolltoBottom(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ) {
        // console.log('should scroll');
        messages.scrollTop(scrollHeight);
    }
    }

    socket.on('connect', function(){
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
     if(err) {
         alert(err);
    window.location.href = '/';
     } else {
      console.log('no error')
     }
    });
    });

           
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

    socket.on('updateUserList', function(users) {
      //   console.log('Users list', users);
        var ol = jQuery('<ol></ol>');

        users.forEach(function (user) {
          ol.append(jQuery('<li></li>').text(user));
        });
      
        jQuery('#users').html(ol);
    });
    // socket.on('newEmail', function (email) {
    //     console.log('new Email', email);
    // });

    
    socket.on('newMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('LT');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template ,{
            text: message.text,
            from: message.from,
            createdAt:formattedTime
        });
        jQuery('#messages').append(html);
        scrolltoBottom();
        // console.log('newMessage', message);
        // var formattedTime = moment(message.createdAt).format('LT');
        // var li=jQuery('<li></li>');
        // li.text(`${message.from} ${formattedTime}: ${message.text}`);
        // jQuery('#messages').append(li);
      });

      socket.on('newLocationMessage', function(message){
        var formattedTime = moment(message.createdAt).format('LT');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            from: message.from,
            url: message.url,
            createdAt:formattedTime
        });
        jQuery('#messages').append(html);
        scrolltoBottom();


    //     var formattedTime = moment(message.createdAt).format('LT');
    //    var li = jQuery('<li></li>');
    //    var a= jQuery('<a target="_blank"> My Current Location</a>');
    //    li.text(`${message.from} ${formattedTime}:`);
    //    a.attr('href', message.url);
    //    li.append(a);
    //    jQuery('#messages').append(li);
      });

    //   socket.emit('createMessage', {
    //     from: 'frank',
    //     text: 'hii'
    //    },function(data){
    //        console.log('Got it',data);
    //    });
        var messageTextbox = jQuery('[name=message]');

       jQuery('#message-form').on('submit', function (e) {
        e.preventDefault();

        socket.emit('createMessage' ,{
            // from : 'User',
            // text : jQuery('[name=message]').val()
            text: messageTextbox.val()
          }, function(){
            messageTextbox.val('')
        }); 
       });

       var locationButton =jQuery('#send-location');
       locationButton.on('click', function(){
        if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
        }
           
        locationButton.attr('disabled', 'disabled').text('Sending location');
         
        navigator.geolocation.getCurrentPosition(function(position) {
           // console.log(position);
           locationButton.removeAttr('disabled').text('Send Location');
           socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
           });
        }, function() {
            locationButton.removeAttr('disabled').text('Send Location');
           alert('Unable to fetch the location')
        });
       });
      
     