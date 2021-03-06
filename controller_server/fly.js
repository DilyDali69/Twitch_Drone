const fs = require('fs');
const https = require('https');
const app = require('express')();
const server = https.createServer(
  {
    key: fs.readFileSync(`${__dirname}/key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/cert.pem`, 'utf8'),
  },
  app
);
const dgram = require('dgram');
const wait = require('waait');
const io = require('socket.io')(https);
const throttle = require('lodash/throttle');
const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';
const drone = dgram.createSocket('udp4');
drone.bind(PORT);

function parseState(state) {
  return state
    .split(';')
    .map((x) => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.send('command', 0, 7, PORT, HOST, handleError);

drone.on('message', (message) => {
  console.log(`🚁 : ${message}`);
  io.sockets.emit('status', message.toString());
});

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

io.on('connection', (socket) => {
  socket.on('command', (command) => {
    console.log('command Sent from browser');
    console.log(command);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  });

  socket.emit('status', 'CONNECTED');
});

droneState.on(
  'message',
  throttle((state) => {
    const formattedState = parseState(state.toString());
    io.sockets.emit('dronestate', formattedState);
  }, 100)
);

app.get('*', () => {
  console.log('Server Pinged');
});

server.listen(6767, () => {
  console.log('Socket io server up and running');
});
