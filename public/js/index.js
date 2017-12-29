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

// socket.on('getallRoomList', function(rooms) {
//     console.log('Users list', rooms);
//      var ol = jQuery('<select></select>');
//     //  rooms.map(function (room) {
//     //     console.log('inside index.js',room);
//     //    ol.append(jQuery('<option></option>').text(room));
//     //  });
//     for(var r=0; r<rooms.length; r++) {
//         ol.append(jQuery('<option></option>').text(rooms[r]));
//         console.log(ol);
//     }
//      jQuery('#room').html(ol);
//  });

