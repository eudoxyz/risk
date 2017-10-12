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

Server.igraci = [];
Server.teritorije = [];

io.on('connect', function(socket) {

  socket.on('playerEntered', function(name, cb) {
    if (Server.igraci.every(function(igrac) {
      return igrac.name != name;
    })) {
      Server.igraci.push({
        'id': socket.id,
        'name': name,
        'color': colors.pop(),
        'ready': false
      });
      cb(true);
    } else cb(false);

    socket.on('lobbyCreated', function() {
      io.emit('updateLobby', dataForLobby(socket));
    });

    socket.on('ready', function(isReady) {
      Server.igraci.find(igrac => igrac.id === socket.id).ready = isReady;
      if (Server.igraci.length > 1) {
        const allReady = Server.igraci.every(function(igrac) {
          return igrac.ready === true;
        });
        if (allReady) {
          io.emit('allReady');
          for (let i = 0; i < 42; i++) {
            Server.teritorije.push({
              'igrac': Server.igraci[i % Server.igraci.length].name,
              'brojTenkica': 0
            });
          }
          Server.teritorije = _.shuffle(Server.teritorije);
        }
      }
      io.emit('updateLobby', dataForLobby(socket));
    });

    socket.on('playStarted', function(__, cb) {
      const boje = {};
      Server.igraci.forEach(function(igrac) {
        boje[igrac.name] = igrac.color;
      });
      cb({ 'teritorije': Server.teritorije, 'boje': boje });

      /*
      socket.on('disconnect', function() {
        Server.igraci.splice(Server.igraci.indexOf(socket.id), 1);
        io.emit('connectionEvent', false);
      });
      */

    });

    socket.on('disconnect', function() {
      Server.igraci.splice(Server.igraci.indexOf(Server.igraci.find(igrac => igrac.id === socket.id)), 1);
      io.emit('updateLobby', Server.igraci);
    });
  });

});


function findPlayerByID(id) {
  return Server.igraci.find(igrac => igrac.id === id);
}

function dataForLobby(socket) {
  return {
    'igraci': Server.igraci.map(x => ({ 'name': x.name, 'ready': x.ready })),
  }
}
