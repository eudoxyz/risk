const Client = {};
Client.socket = io();

Client.socket.on('connect', function() {
  if (!localStorage.getItem('persistentID'))
    localStorage.setItem('persistentID', Client.socket.id);
  Client.socket.emit('tokenReady', localStorage.getItem('persistentID'));
});
