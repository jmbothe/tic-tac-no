import React, { Component } from 'react';
import { initialState } from 'src/game/tic_tac_toe.js';
import Board from './Board.jsx';

class App extends Component {
  state = {
    ...initialState,
  };

  render() {
    return (
      <Board {...this.state} />
    );
  }
}

export default App;
