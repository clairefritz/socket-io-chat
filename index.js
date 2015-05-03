var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var usernames = {};

io.on('connection', function(socket){
	socket.on('add user', function(username) {
		console.log(username + ' connected');
		socket.username = username;
		socket.emit('user added', 'Welcome to this chatroom, ' + username + '.');
		socket.broadcast.emit('user added', username + ' has joined.');
	});

  socket.on('disconnect', function(){
    console.log(socket.username + ' disconnected');
  });
  socket.on('chat message', function(msg){
    socket.emit('chat message', msg, 'self');
    socket.broadcast.emit('chat message', msg, socket.username, 'peer');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});