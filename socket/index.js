let socket_io = require('socket.io');
let io = socket_io();
let socketApi= {};
//Your socket logic here
io.on('connection', function (socket) {
  require('./chatSocketApi')(io, socket);
});
socketApi.io = io;
module.exports = socketApi;

