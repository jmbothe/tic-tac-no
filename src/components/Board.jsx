import React from 'react';
import styled from 'styled-components';

import Tile from './Tile.jsx';

const BoardWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100vmin;
  height: 100vmin;
`;

const Board = props => {
  return (
    <BoardWrapper>
      <Tile
        playerMark="X"
        index={0}
      />
      <Tile
        playerMark="X"
        index={1}
      />
      <Tile
        playerMark="O"
        index={2}
      />
      <Tile
        playerMark="X"
        index={3}
      />
      <Tile
        playerMark=""
        index={4}
      />
      <Tile
        playerMark="X"
        index={5}
      />
      <Tile
        playerMark="O"
        index={6}
      />
      <Tile
        playerMark="X"
        index={7}
      />
      <Tile
        playerMark=""
        index={8}
      />
    </BoardWrapper>
  );
};

export default Board;
