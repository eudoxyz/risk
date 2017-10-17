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

const colors = [0x44cd7e, 0xa5280e, 0x3716dd];

function Player(id, token, name, color, troops, isReady) {
  this.id = id;
  this.token = token;
  this.name = name;
  this.color = color;
  this.troops = troops;
  this.isReady = isReady;
}

function Territory(owner, troops) {
  this.owner = owner;
  this.troops = troops;
}

Server.players = [];
Server.territories = [];

Server.players.push(new Player(null, null, 'Dummy', 0xcc99ff, null, true));

io.on('connect', function(socket) {

  let token;
  socket.on('tokenReady', function(_token) {
    token = _token;
  });

  socket.on('playerEntered', function(name, cb) {
    if (Server.players.every(function(player) {
      return player.name != name;
    })) {
      Server.players.push(new Player(socket.id, token, name, colors.pop(), null, false));
      cb(true);
    } else cb(false);

    socket.on('lobbyCreated', function() {
      io.emit('updateLobby', dataForLobby());

      socket.on('ready', function(isReady) {
        findPlayerByID(socket.id).isReady = isReady;
        if (Server.players.length > 1) {
          const allReady = Server.players.every(function(player) {
            return player.isReady === true;
          });
          if (allReady) {
            io.emit('allReady');
            for (let i = 0; i < 42; i++)
              Server.territories.push(new Territory(Server.players[i % Server.players.length], 0));
            Server.territories = _.shuffle(Server.territories);
          }
        }
        io.emit('updateLobby', dataForLobby());
      });
    });

    socket.on('playStarted', function(__, cb) {
      const initTroops = 40 - (Server.players.length - 2) * 5;
      Server.players.forEach(function(player) {
        player.troops = initTroops;
      });
      cb(Server.territories.map(function(territory) {
        return {
          name: territory.owner.name,
          color: territory.owner.color
        };
      }), initTroops);

      socket.on('addTroop', function(num, isAdded) {
        if (Server.territories[num].owner.id !== socket.id) return;

        let troops;
        const player = findPlayerByID(socket.id);
        if (isAdded) {
          troops = ++Server.territories[num].troops;
          player.troops--;
        } else if (Server.territories[num].troops > 0) {
          troops = --Server.territories[num].troops;
          player.troops++;
        }

        io.emit('updateTroops', { troops: troops ? troops : '', num: num });
        socket.emit('updateMyTroops', player.troops);
      });

      socket.on('disconnect', function() {
        setTimeout(function() {
          Server.players.splice(Server.players.indexOf(findPlayerByID(socket.id)), 1);
          console.log('Player disconnected.');
        }, 0);
      });
    });

    socket.on('disconnect', function() {
      //
    });

  });
});


function findPlayerByID(id) {
  return Server.players.find(igrac => igrac.id === id);
}

function dataForLobby() {
  return {
    'players': Server.players.map(x => ({ 'name': x.name, 'ready': x.isReady })),
  }
}
