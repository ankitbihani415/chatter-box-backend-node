var mongoose = require('mongoose');
//require chalk module to give colors to console text
var chalk = require('chalk');

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

var options = {
				useNewUrlParser: true,
				useUnifiedTopology: true
			};
            
// var dbURL = 'mongodb+srv://root:FeUwJS6kPTg5Rm6@cluster0.xzm6v.mongodb.net/chatter-box?retryWrites=true&w=majority';
var dbURL = 'mongodb://localhost:27017/chatter-box?readPreference=primary&ssl=false';
// var dbURL = 'mongodb://root:FeUwJS6kPTg5Rm6@cluster0.xzm6v.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true'

//export this function and imported by server.js
console.log(connected("Mongoose connection is about to start ", dbURL));

mongoose.connect(dbURL,options);

mongoose.connection.on('connected', function(){
    console.log(connected("Mongoose default connection is open to ", dbURL));
});

mongoose.connection.on('error', function(err){
    console.log(error("Mongoose default connection has occured "+err+" error"));
});

mongoose.connection.on('disconnected', function(){
    console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
    });
});

module.exports = mongoose.connection;