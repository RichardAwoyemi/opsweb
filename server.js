var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist/opsonion-web'));

app.get('*', function(req, res){
  res.send('what???', 404);
});

var listener = server.listen(process.env.PORT || 5000, function () {
  console.log('Listening on port ' + listener.address().port);
});

