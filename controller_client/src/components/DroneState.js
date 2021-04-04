import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../socket';
import Battery from './Battery';
import Tilt from './Tilt';

function useDroneState() {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on('dronestate', updateDroneState);
    return () => socket.removeListener('dronestate');
  }, []);
  return droneState;
}

function useSocket() {
  const [status, updateStatus] = useState('DISCONNECTED');
  useEffect(() => {
    socket.on('status', updateStatus);
    return () => socket.removeListener('status');
  }, []);
  return status;
}

function droneMessageUI(message) {
  if(message === 'ok') {
    return {background: '#69ffc3', color: '#151515', message: "✔️ Copy That"}
  }
  else if(message === 'error') {
    return {background: '#e4e4e6', color: '#151515', message: "❌ Try Again"}
  }
  else if(message === 'DISCONNECTED') {
    return {background: '#e23067', color: '#151515', message: "❌ DISCONNECTED"}
  }
  else {
    return {background: '#69ffc3', color: '#151515', message: "✔️ CONNECTED"}
  }
}

const DroneStateStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 5px;
  .status {
    grid-column: 1 / -1;
    text-align: center;
    color: white;
  }
`;

const DroneState = () => {
  const status = useSocket();
  const droneState = useDroneState([]);
  const message = droneMessageUI(status)

  return (
    <DroneStateStyles>
      <p className="status">
        Drone Message: <span style={{background: message.background, color: message.color}}>{message.message}</span>
      </p>
      <Battery battery={droneState.bat} />
      <Tilt
        pitch={droneState.pitch}
        roll={droneState.roll}
        yaw={droneState.yaw}
        height={droneState.h}
      />
    </DroneStateStyles>
  );
};

export default DroneState;
