'use strict'
var api = {};
global.api = api;
api.net = require('net');

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var n = 3;
var results = [];
var count = 0;
var rcvCount = 0;

var server = api.net.createServer(function(socket) {
  let start = count * n;
  let end = ((count + 1) * n);
  count = count + 1;
  socket.write(JSON.stringify({id: count, task: task.slice(start, end)}));  
  console.log('Connected: ' + socket.localAddress);
  socket.on('data', function(data) {   
    console.log('Data received (by server): ' + data);
    let res = {};
    try {
      res = JSON.parse(data);
   
    } catch (e) {
      
    }
    if('result' in res) {
      let start = rcvCount * n;
      let end  = (rcvCount + 1) * n - 1;
      console.log(start + " " + end);  
      let j = 0;
      for(let i = start; i <= end; i++) {
        results[i] = res.result[j];
        j++;
      }
      rcvCount++;
    }     
    if((rcvCount*n) >= task.length) {
      server.close(function(error) {
            console.log("Result: " +results);
      });
    }     
  });
}).listen(2000);
