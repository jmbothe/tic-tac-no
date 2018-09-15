import React from 'react';
import styled from 'styled-components';

import Tile from './Tile.jsx';

const BoardWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100vmin;
  height: 100vmin;
`;

const Board = props => (
  <BoardWrapper>
    {
      props.computeBoard().map((tile, index) => <Tile {...props} occupied={tile} index={index} key={index} />)
    }
  </BoardWrapper>
);

export default Board;
