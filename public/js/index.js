var socket =io();
socket.on('getallRoomList', function(rooms) {
    console.log('Users list', rooms);
     var ol = jQuery('<select></select>');
     console.log(ol);
     rooms.map(function (room) {
        console.log('inside index.js',room);
       ol.append(jQuery('<option></option>').text(room));
     });
   
     jQuery('#room').html(ol);
 });


