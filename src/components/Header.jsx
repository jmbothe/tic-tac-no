import React from 'react';
import styled from 'styled-components';

import {
  PRIMARY_COLOR,
  PRIMARY_COLOR_DARK,
} from '../styleConstants';

const HeaderWrapper = styled.header`
  padding: 1rem;
  width: 100%;
  background-color: ${PRIMARY_COLOR};
  color: #fff;
  border-top: 10px solid ${PRIMARY_COLOR_DARK};
  box-shadow: 0 0 20px 4px #ddd;
`;

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 1.25rem;
  color: #fff;
`;

const Header = () => (
  <HeaderWrapper>
    <H1>Tic Tac NO!</H1>
    <H2>The classic game of strategy, featuring an unbeatable AI opponent.</H2>
  </HeaderWrapper>
);

export default Header;
