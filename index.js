const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/js', express.static('public/js'));
app.use('/snd', express.static('public/snd'));
app.use('/img', express.static('public/img'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 8080;
server.listen(port, function() {
  console.log('listening on *:' + port);
});

server.igraci = [];

io.on('connect', function(socket) {

  socket.on('playerEntered', function(name) {
    server.igraci.push({
      'id': socket.id,
      'name': name
    });

    socket.on('lobbyCreated', function() {
      io.emit('updateLobby', server.igraci);
    });
  });

  socket.on('disconnect', function() {
    server.igraci.splice(server.igraci.indexOf(server.igraci.find(igrac => igrac.id === socket.id)), 1);
  });

  /*
  socket.on('playStarted', function() {
    server.igraci.push(socket.id);
    if (server.igraci.length > 1) {
      io.emit('connectionEvent', true);
    }

    socket.on('disconnect', function() {
      server.igraci.splice(server.igraci.indexOf(socket.id), 1);
      io.emit('connectionEvent', false);
    });

  });
  */

});
