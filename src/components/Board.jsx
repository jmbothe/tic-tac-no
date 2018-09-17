import React from 'react';
import styled from 'styled-components';

import Tile from './Tile.jsx';

const BoardWrapper = styled.section`
  position: relative;
  display: flex;
  width: 100%;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  @media(orientation: landscape) {
    max-width: 480px;
  }
`;

const Board = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Game = props => (
  <BoardWrapper>
    <Board>
      {props.computeBoard().map((tile, index) => (
        <Tile {...props} occupied={tile} index={index} key={index} />
      ))}
    </Board>
  </BoardWrapper>
);

export default Game;
