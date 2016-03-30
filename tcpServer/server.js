var api = {};
global.api = api;
api.net = require('net');

var user = { name: 'Marcus Aurelius', age: 1895 };
var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var results = [];

var server = api.net.createServer(function(socket) {
  socket.write(JSON.stringify({task: task}));
  console.log('Connected: ' + socket.localAddress);
  socket.on('data', function(data) {
    console.log('Data received (by server): ' + data);
    results.push(data.result);
  });
}).listen(2000);
