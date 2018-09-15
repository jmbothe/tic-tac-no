import React, { Component } from 'react';
import {
  initialGameState,
  generateNextGameState,
  checkForGameOver,
  getWinner,
} from 'src/game/tic_tac_toe.js';
import { getBestMove } from 'src/game/perfect_player.js';
import Board from './Board.jsx';

class App extends Component {
  state = {
    game: initialGameState,
    loading: false,
    winner: undefined,
  };

  handleHumanMove = move => {
    const nextGameState = generateNextGameState(this.state.game, move);
    if (checkForGameOver(nextGameState)) {
      const winner = getWinner(nextGameState);
      this.setState({ game: nextGameState, winner });
    } else {
      this.setState({ game: nextGameState }, () => {
        if (!this.state.game.players[this.state.game.activePlayer].isHuman) {
          this.handleComputerMove();
        }
      });
    }
  };

  handleComputerMove = () => {
    this.setState({ loading: true }, () => {
      const nextGameState = generateNextGameState(
        this.state.game,
        getBestMove(
          this.state.game,
          JSON.parse(JSON.stringify(this.state.game)),
        ),
      );
      if (checkForGameOver(nextGameState)) {
        const winner = getWinner(nextGameState);
        this.setState({ game: nextGameState, winner, loading: false });
      } else {
        this.setState({ game: nextGameState, loading: false }, () => {
          if (!this.state.game.players[this.state.game.activePlayer].isHuman) {
            this.handleComputerMove();
          }
        });
      }
    });
  };

  computeBoard = () => {
    const arr = new Array(9).fill(undefined);

    return arr.map((_, index) => {
      if (this.state.game.players.X.moves.includes(index)) return 'X';
      if (this.state.game.players.O.moves.includes(index)) return 'O';
      return undefined;
    });
  }

  render() {
    return <Board
      {...this.state}
      computeBoard={this.computeBoard}
      handleHumanMove={this.handleHumanMove}
      handleComputerMove={this.handleComputerMove}
    />;
  }
}

export default App;
