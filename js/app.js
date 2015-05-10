var socket = io();
socket.on('connect', function() {
  socket.emit('add user', prompt("What's your name?"));
});

socket.on('typing', function(user) {
  $('.typing').text(user + ' is typing...').show();
  setTimeout(function() {
    $('.typing').hide();
  }, 1500);
});

var previousSender = '',
    displayName;
socket.on('chat message', function(msg, username, sender) {
  console.log(msg, username, sender);
  if (previousSender.length === 0 || username !== previousSender) {
    displayName = (sender === 'self')? 'You': username
    $('#messages').append('<p class="notification message-title">'+ displayName +':</p>');
    $('<ul class="'+ sender +'">').appendTo('#messages').append($('<li class="'+ sender +'">').text(msg));
  } else {
    $('#messages ul:last').append($('<li>').text(msg));
  }
  previousSender = username;
});

socket.on('user added', function(msg) {
  $('#messages').append($('<p class="notification welcome">').text(msg));
});

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

$('#m').on('keypress', function() {
  socket.emit('typing');
});