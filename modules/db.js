/**
 * Created by mr_freelancer on 07-Apr-15.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/homework');
var connected = false;



var UserStateSchema = new mongoose.Schema({
    step: {type:Number},
    usergroup:{type:String},
    user:{
        name:String,
        x: Number,
        y:Number,
        health: Number
    }
}, {collection:'game'});
var UserModel = db.model('userState',UserStateSchema)


db.once('open',function(){
    connected = true;
    console.log('Connect to mongodb established');
/*
    db.dropCollection('game',function(err){
        if (err) throw err;
        console.log('db collection dropped');
     });
*/
});

function write2db(step,group,obj){
    var userstate = new UserModel({step :step, usergroup: group, user: obj});
    userstate.save(function(err,_userstate){
        if(err) throw err;
        else
        {
            console.log('Write to db: '+_userstate);
        }
    })
}

function closeConnection(){
    db.disconnect();
}
module.exports.db = db;
module.exports.write2db=write2db;
module.exports.closeConnection=closeConnection;