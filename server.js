const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/financialhouse'));

console.log('Server is running...');
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/financialhouse/index.html'));
});

app.listen(process.env.PORT || 8080);
