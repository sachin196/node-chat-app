class Users {
    constructor () {
     this.users =[];
     this.rooms=[];
    // for (property in Users) {
    //     console.log("property", Users(property));
    // }
    }

    addUser(id, name, room) {
        room =room.toLowerCase();
        var user = {id, name, room};
        console.log('this is the user',user);
        console.log(this.users);
        // this.users.push(user);
    //  console.log(user);
    if(this.users.length==0)
    {
        this.users.push(user);
    }
    else{
        console.log('here......')
        var con=this.users.filter((user)=>{
            var data=user.name === name;
            console.log(user);
            console.log(name);
            console.log(data);
           return data;
        });
        console.log(con);
        console.log('con');
        if(con.length == 0)
        {
            this.users.push(user);
        } else
        {
            return false;
        }
    }
    
    

        if(this.rooms.indexOf(room) < 0){
            this.rooms.push(room);
        }
        
        // console.log(room);
        // console.log(user);
        // JSON.stringify(user);
        console.log(this.users);
        return user;
       return room;
        
    }

  
    removeUser(id){
      var user = this.getUser(id);

      if(user) {
        this.users = this.users.filter((user) => user.id !== id);
      }
      return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList (room){
        
        console.log('get user list by room '+room)
        var user = this.users.filter((user) => user.room === room.toLowerCase());
        var namesArray = user.map((user) => user.name);
        // console.log(namesArray)
        return namesArray;
    }
    // getRoomList (room){
    //     var users = this.users.filter((user) => user.room === room);
    //     var roomsArray = users.map((user) => user.room);

    //     return roomsArray;
    // }
    getallRoomList () {
        var rooms = this.rooms;
        console.log(rooms);
        return rooms;
    }
}

module.exports ={Users};



// class Person {
//     constructor (name, age) {
//      this.name =name;
//      this.age = age;
//     }
//     getUserDescripton () {
//         return `${this.name} is ${this.age} years old.`; 
//     }
// }


// var me = new Person('Andrew', 23);
// var description = me.getUserDescripton();
// console.log(description);