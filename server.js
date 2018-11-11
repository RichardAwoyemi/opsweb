const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/dist/opsonion-web'));
app.get('/*', function (res) {
  res.sendFile(path.join(__dirname + '/dist/opsonion-web/index.html'));
});
app.listen(process.env.PORT || 8080);