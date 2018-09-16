import React from 'react';
import styled from 'styled-components';

const TileWrapper = styled.button`
  width: 33.333%;
  height: 33.333%;
  background: transparent;
  border: 1px solid black;
  border-top: ${props => (props.index > 2 ? '1px solid black' : 'none')};
  border-bottom: ${props => (props.index < 6 ? '1px solid black' : 'none')};
  border-left: ${props => (props.index % 3 === 0 ? 'none' : '1px solid black')};
  border-right: ${props =>
    (props.index - 2) % 3 === 0 ? 'none' : '1px solid black'};
  font-family: "Bowlby One SC", cursive;
  font-size: 3rem;
  color: ${props => (props.occupied === 'X' ? 'red' : 'blue')};
`;

const Tile = props => (
  <TileWrapper
    {...props}
    onClick={() => props.handleHumanMove(props.index)}
    disabled={props.loading}
  >
    {props.occupied}
  </TileWrapper>
);

export default Tile;
