import React from 'react';
import styled from 'styled-components';

const BatteryStyles = styled.div`
  width: 100%;
  --color: ${(props) => (props.level > 20 ? '#69FFC3' : '#E91916')};
  border: 2px solid #3e3e40;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  /* box-shadow: 0 0 10px var(--color); */
  background: #18181b;
  .batteryLevel {
    transition: all 0.5s;
    height: ${(props) => props.level}%;
    text-align: center;
    color: #18181b;
    display: block;
    background: var(--color);
  }
`;

const Battery = (props) => (
  <BatteryStyles level={props.battery}>
    <span className="batteryLevel">Batt {props.battery}%</span>
  </BatteryStyles>
);

Battery.defaultProps = {
  // battery: 'LOADING',
  battery: 60,
};

export default Battery;
