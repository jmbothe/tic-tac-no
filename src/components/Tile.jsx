import React from 'react';
import styled from 'styled-components';
import { Consumer } from 'src/components/App.jsx';
import {
  PRIMARY_COLOR_DARK,
  ACCENT_COLOR,
  PRIMARY_TEXT,
} from 'src/styleConstants';

const TileWrapper = styled.button`
  width: 33.333%;
  height: 33.333%;
  padding: 0;
  background: transparent;
  border-top: ${props =>
    props.index > 2 ? `1px solid ${PRIMARY_TEXT}` : 'none'};
  border-bottom: ${props =>
    props.index < 6 ? `1px solid ${PRIMARY_TEXT}` : 'none'};
  border-left: ${props =>
    props.index % 3 === 0 ? 'none' : `1px solid ${PRIMARY_TEXT}`};
  border-right: ${props =>
    (props.index - 2) % 3 === 0 ? 'none' : `1px solid ${PRIMARY_TEXT}`};
  font-family: "Bowlby One SC", cursive;
  font-size: 5rem;
  color: ${props =>
    props.occupied === 'X' ? ACCENT_COLOR : PRIMARY_COLOR_DARK};
`;

const Tile = ({ occupied, index }) => (
  <Consumer>
    {({ inPlay, loading, handleMove }) => (
      <TileWrapper
        index={index}
        occupied={occupied}
        onClick={() => handleMove(index)}
        disabled={occupied || loading || !inPlay}
        aria-label={`Board tile position ${index}, ${
          occupied ? `occupied by player ${occupied}` : 'unoccupied.'
        }`}
      >
        {occupied}
      </TileWrapper>
    )}
  </Consumer>
);

export default Tile;
