const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/js', express.static('public/js'));
app.use('/snd', express.static('public/snd'));
app.use('/img', express.static('public/img'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

const port = process.env.PORT || 8080;
http.listen(port, function() {
  console.log('listening on *:' + port);
});

const igraci = [];

io.on('connect', function(socket) {

  socket.on('playStarted', function() {
    igraci.push(socket.id);
    if (igraci.length > 1) {
      io.emit('connectionEvent', true);
    }

    socket.on('disconnect', function() {
      igraci.splice(igraci.indexOf(socket.id), 1);
      io.emit('connectionEvent', false);
    });
  });

});
