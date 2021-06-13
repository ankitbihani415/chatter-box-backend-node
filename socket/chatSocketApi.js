users = [];
user = null;
console.log('ChatSocket File Called')
module.exports = function(io,socket){
    socket.on('setUsername', function(data) {
        if(users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            socket.username = data;
            users.push(data);
            socket.emit('userSet', {username: data});
            io.sockets.emit('newUserRegister', {username: data});
            console.log(users)
        }
    });

    socket.on('user_list',function(data){
        socket.emit('get_user_list',users)
    })

    socket.on('msg', function(data) {
        io.sockets.emit('newmsg', data);
    });

    socket.on('typing',function(data){
        console.log('notifyTyping', data.user)
        socket.broadcast.emit('notifyTyping', data.user);
    });

    socket.on('notTyping', function(data){
        socket.broadcast.emit('stopTyping',data.user);
    });

    socket.on('user_image', function (msg) {
        io.sockets.emit('user_image', socket.username, msg);
    });
    
    socket.on('disconnect',function(){
        if(socket.username){
            // socket.broadcast.emit('stopTyping',socket.username);
            socket.broadcast.emit('user_left',socket.username);
        }
        position = users.indexOf(socket.username)
        users.splice(position,1)
    });
}