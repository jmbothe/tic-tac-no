import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  padding: 2rem 1rem;
  width: 100%;
  box-shadow: 0 0 20px 4px #ddd;
`;

const H1 = styled.h1`
  text-align: center;
`;

const H2 = styled.h2`
  text-align: center;
`;

const Header = () => (
  <HeaderWrapper>
    <H1>Tic Tac NO!</H1>
    <H2>
      The classic game of strategy, featuring an unbeatable AI opponent.
    </H2>
  </HeaderWrapper>
);

export default Header;
