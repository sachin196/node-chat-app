 const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/ChatApp', (err, db) => {
    if(err) {
    return  console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to Mongodb server');
    db.collection('users').insertOne({
    name:'sachin',
    room: 'room'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert todo')
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    });
    db.close();
    });