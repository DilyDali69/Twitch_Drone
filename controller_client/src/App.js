import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import TwitchFont from './fonts/twitch_font.woff2';
import DroneState from '../src/components/DroneState';
import Commands from '../src/components/Commands';

const GlobalStyle = createGlobalStyle`
  html, body, #root{
    font-family: "Inter", "system-ui";
    background: #0E0E10;
  }
  body {
    font-weight: 900;
    font-size: 1rem;
    color: white;
  }
  * {
    box-sizing: border-box;
  }
  h2 {
    text-align: center;
    color: white
  }
  #user {
    font-weight: 600;
    background: #e4e4e6;
    color: #323239;
    padding: 2px;
  }
`;

const PageStyles = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const IndexPage = () => (
  <PageStyles>
    <h2>
      Current pilot: <span id="user">@twitchuser</span>
    </h2>
    <GlobalStyle />
    <Commands />
    <DroneState />
  </PageStyles>
);

export default IndexPage;
