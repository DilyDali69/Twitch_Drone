import React from 'react';
import styled from 'styled-components';
import socket from '../socket';

const CommandGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 3px;
  button {
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.05);
    border: 0;
    background: #744ab2;
    border: 4px solid transparent;
    color: #151515;
    font-size: 1rem;
    font-weight: 600;
    position: relative;
    &:active {
      top: 2px;
    }
    &:focus {
      outline: 0;
      border-color: #00f9d8;
    }
    &.takeoff {
      background: #261d35;
      color: #e4e4e6;
    }
    &.land {
      background: #41315b;
      color: #e4e4e6;
    }
    &.emergency {
      background: black;
      text-transform: uppercase;
      color: red;
    }
    &.rotate {
      background: #261d35;
      color: #e4e4e6;
    }
    &.height {
      background: #41315b;
      color: #e4e4e6;
    }
    &:hover {
      box-shadow: inset 0 0 0 50px rgba(0, 0, 0, 0.2);
    }
    span.symbol {
      display: block;
      font-size: 2rem;
      font-weight: 400;
    }
    &:disabled {
      background: #a66bffab;
      color: grey;
      box-shadow: none;
    }
  }
  .center {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr;
    button:last-child {
      grid-column: span 2;
    }
  }
  h2 {
    grid-column: 1 / -1;
    background: #18181b;
    margin: 0;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem;
    color: white;
  }
`;

function sendCommand(command) {
  return function () {
    console.log(`Sending the command ${command}`);
    socket.emit('command', command);
  };
}

const amount = 100;
const Commands = () => (
  <CommandGrid>
    <button className="rotate" onClick={sendCommand('ccw 90')}>
      <span className="symbol">⟲</span> 90°
    </button>
    <button onClick={sendCommand(`forward ${amount}`)}>
      <span className="symbol">↑</span> forward {amount}cm
    </button>
    <button className="rotate" onClick={sendCommand('cw 15')}>
      <span className="symbol">⟳</span> 15°
    </button>
    <button onClick={sendCommand(`left ${amount}`)}>
      <span className="symbol">←</span> left {amount}cm
    </button>
    <div className="center">
      <button className="takeoff" onClick={sendCommand('takeoff')}>
        Take Off
      </button>
      <button className="land" onClick={sendCommand('land')}>
        Land
      </button>
      <button className="emergency" onClick={sendCommand('emergency')}>
        !! emergency !!
      </button>
    </div>
    <button onClick={sendCommand(`right ${amount}`)}>
      <span className="symbol">→</span>
      right {amount}cm
    </button>
    <button className="height" onClick={sendCommand(`up ${amount}`)}>
      <span className="symbol">⤒</span> {amount}cm
    </button>
    <button onClick={sendCommand(`back ${amount}`)}>
      <span className="symbol">↓</span> back {amount}cm
    </button>
    <button className="height" onClick={sendCommand(`down ${amount}`)}>
      <span className="symbol">⤓</span> {amount}cm
    </button>
    <h2>Stunt Panel</h2>
    <button onClick={sendCommand('flip l')}>Flip Left</button>
    <button onClick={sendCommand('flip r')}>Flip Right</button>
    <button onClick={sendCommand('flip b')}>Flip Back</button>
    <button onClick={sendCommand('flip f')}>Flip Forward</button>
    <button disabled onClick={sendCommand('go 25 25 25 25')}>
      Go 25 25 25 25
    </button>
    <button disabled onClick={sendCommand('curve 100 100 100 150 250 350 50')}>
      Curve
    </button>
  </CommandGrid>
);

export default Commands;
