const _ = require('underscore');
const express = require('express');
const app = express();
const Server = require('http').Server(app);
const io = require('socket.io')(Server);

app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/snd', express.static('public/snd'));
app.use('/img', express.static('public/img'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 8080;
Server.listen(port, function() {
  console.log('listening on *:' + port);
});

const colors = [0xa5280e, 0x3716dd];

function Player(id, name, color, isReady) {
  this.id = id;
  this.name = name;
  this.color = color;
  this.isReady = isReady;
}

function Territory(color, troops) {
  this.color = color;
  this.troops = troops;
}

Server.players = [];
Server.territories = [];

io.on('connect', function(socket) {

  socket.on('playerEntered', function(name, cb) {
    if (Server.players.every(function(player) {
      return player.name != name;
    })) {
      Server.players.push(new Player(socket.id, name, colors.pop(), false));
      cb(true);
    } else cb(false);

    socket.on('lobbyCreated', function() {
      io.emit('updateLobby', dataForLobby());

      socket.on('ready', function(isReady) {
        findPlayerByID(socket.id).ready = isReady;
        if (Server.players.length > 1) {
          const allReady = Server.players.every(function(player) {
            return player.ready === true;
          });
          if (allReady) {
            io.emit('allReady');
            for (let i = 0; i < 42; i++) {
              Server.territories.push(new Territory(Server.players[i % Server.players.length].color, 0))
            }
            Server.territories = _.shuffle(Server.territories);
          }
        }
        io.emit('updateLobby', dataForLobby());
      });
    });

    socket.on('playStarted', function(__, cb) {
      cb(Server.territories);
    });

    socket.on('disconnect', function() {
      Server.players.splice(Server.players.indexOf(findPlayerByID(socket.id)), 1);
      io.emit('updateLobby', dataForLobby());
    });
  });

});


function findPlayerByID(id) {
  return Server.players.find(igrac => igrac.id === id);
}

function dataForLobby() {
  return {
    'players': Server.players.map(x => ({ 'name': x.name, 'ready': x.ready })),
  }
}
