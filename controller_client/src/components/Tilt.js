import React from 'react';
import styled from 'styled-components';
import droneImage from '../static/drone.png';

const TiltWrap = styled.div`
  perspective: 500px;
  transform-style: preserve-3d;
  text-align: center;
  display: grid;
  justify-content: center;
  overflow: hidden;
  grid-gap: 5px;
  grid-template-columns: repeat(4, 1fr);
  span {
    background: #3e3e40;
  }
`;
const TiltStyles = styled.div`
  background-image: url(${droneImage});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 200px;
  color: #787879;
  transform: rotateX(${(props) => props.pitch}deg)
    rotate(${(props) => props.yaw * -1}deg)
    rotateY(${(props) => props.roll * -1}deg);
  position: relative;
  grid-column: 1 / -1;
`;

const Tilt = ({ pitch, roll, yaw, height }) => (
  <TiltWrap>
    <span>PCH: {pitch}</span>
    <span>YAW: {yaw}</span>
    <span>RL: {roll}</span>
    <span>HT: {height / 100}M</span>
    <TiltStyles pitch={pitch} roll={roll} yaw={yaw} />
  </TiltWrap>
);

Tilt.defaultProps = {
  pitch: 0,
  roll: 0,
  yaw: 0,
  height: 0,
};

export default Tilt;
