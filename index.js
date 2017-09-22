const app = require('express')();

app.get('/', function(req, res) {
  res.send('Hello Heroku!');
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port ' + port);
