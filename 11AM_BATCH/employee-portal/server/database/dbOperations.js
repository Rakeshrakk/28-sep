const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017/infosys-portal';
let _db;

const mongoConnect = callback => {
    MongoClient.connect(url).then(
        client => {
            console.log('Connected Successfully to Mongo DB');
            _db = client.db();
            callback();
        }
    ).catch(err => {
        console.log(err);
        throw err;

    });
};

const getDB = () => {
    if(_db){
        return _db;
    }
    throw  'No Database found';
};

module.exports = {
    mongoConnect ,
    getDB
};