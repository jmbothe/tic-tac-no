import React from 'react';
import styled from 'styled-components';
import { Consumer } from 'src/components/App.jsx';
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
    width: 50%;
    max-width: 480px;
  }
`;

const Board = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 1rem 1rem;
`;

const Game = () => (
  <Consumer>
    {({ computeBoard }) => (
      <BoardWrapper>
        <Board>
          {computeBoard().map((tile, index) => (
            <Tile occupied={tile} index={index} key={index} />
          ))}
        </Board>
      </BoardWrapper>
    )}
  </Consumer>
);

export default Game;
