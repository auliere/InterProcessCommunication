var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var task;

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
  socket.write('Hello from client');
  socket.on('data', function(data) {
    task = JSON.parse(data);
    console.log('Data received (by client): ' + data);
    socket.end(JSON.stringify({
        id: task.id,
        result: task.task.map(function(item) {
          return item * 2;
        })
      })
    );    
  });
});
