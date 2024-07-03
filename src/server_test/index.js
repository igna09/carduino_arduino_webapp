const app = require('express')();
const cors = require('cors')
const path = require('path');
const busboy = require('busboy');
const http = require('http');
const fs = require('fs');
const ws = require('ws');

const port = 80;

app.use(cors());
const httpServer = http.createServer(app);

app.get('/status', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(`{"ssid": "ssid", "freeHeapSpace": 12345, "available_files": ["logs.txt", "test.js"]}`);
});

app.post('/file', (req, res) => {
  const options = {
      root: path.join(__dirname)
  };
  res.sendFile('index.js', options);
});
app.post('/file-list', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(`[{"name": "settings.json", "type": "file"}, {"name": "test-folder", "type": "folder"}, {"name": "logs.txt", "type": "file"}]`);
});

app.post('/file-upload', (req, res) => manageFileUpload(req, res));
app.post('/update-firmware', (req, res) => manageFileUpload(req, res));

function manageFileUpload(req, res) {
  const bb = busboy({ headers: req.headers });
  let filename;
  bb.on('file', (name, file, info) => {
    filename = info.filename;
    try {
      if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
        fs.mkdirSync(path.join(__dirname, 'uploads'));
      }
    } catch (err) {
      console.error(err);
    }
    const saveTo = path.join(__dirname, 'uploads', filename);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on('close', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`upload success: ${filename}`);
  });
  req.pipe(bb);
}

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
