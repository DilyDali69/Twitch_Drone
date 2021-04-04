const fs = require('fs');
const app = require('express')();
const https = require('https');

const server = https.createServer(
  {
    key: fs.readFileSync(`${__dirname}/key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/cert.pem`, 'utf8'),
    requestCert: false,
    rejectUnauthorized: false,
  },
  app
);
server.listen(6767, () => {
  console.log('Https server running ');
});

const io = require('socket.io').listen(server);

const dgram = require('dgram');
const wait = require('waait');
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

function formatMessage(string) {
  return string.replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
}

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.send('command', 0, 7, PORT, HOST, handleError);

drone.on('message', (message) => {
  console.log(`Drone Response: ${formatMessage(message)}`);
  io.sockets.emit('status', formatMessage(message.toString()));
});

function handleError(err) {
  if (err) {
    console.log('ERROR');
    console.log(err);
  }
}

io.sockets.on('connection', function (socket) {
  socket.on('command', (command) => {
    console.log(formatMessage(command));
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
