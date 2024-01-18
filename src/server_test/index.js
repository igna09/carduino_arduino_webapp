const app = require('express')();
const httpServer = require('http').createServer(app);
const ws = require('ws');

const port = 80;
let wss = new ws.Server({server: httpServer, path: '/ws'});
wss.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    wss.send('message', `${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('close', () => {
    console.log('a user disconnected!');
  });
});

setInterval(() => {
  wss.clients.forEach(function each(client) {
    if (client !== ws && client.readyState === ws.OPEN) {
      client.send("test", { binary: false });
    }
  });
},1000) //logs hi every second

httpServer.listen(port, () => console.log(`listening on port ${port}`));
