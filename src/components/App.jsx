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

  componentDidMount() {
    if (!this.state.game.players[this.state.game.activePlayer].isHuman) {
      this.handleHumanMove(Math.floor(Math.random() * Math.floor(9)));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.game.activePlayer !== prevState.game.activePlayer
      && !this.state.game.players[this.state.game.activePlayer].isHuman
      && !this.state.winner
    ) {
      setTimeout(() => this.handleComputerMove(), 2000);
    }
  }

  handleHumanMove = move => {
    const nextGameState = generateNextGameState(this.state.game, move);
    if (checkForGameOver(nextGameState)) {
      const winner = getWinner(nextGameState);
      this.setState({ game: nextGameState, winner: winner || 'Nobody' });
    } else {
      this.setState({ game: nextGameState, loading: !nextGameState.players[nextGameState.activePlayer].isHuman });
    }
  };

  handleComputerMove = () => {
    const nextGameState = generateNextGameState(
      this.state.game,
      getBestMove(
        this.state.game,
        JSON.parse(JSON.stringify(this.state.game)),
      ),
    );
    if (checkForGameOver(nextGameState)) {
      const winner = getWinner(nextGameState);
      this.setState({ game: nextGameState, winner: winner || 'Nobody', loading: false });
    } else {
      this.setState({ game: nextGameState, loading: !nextGameState.players[nextGameState.activePlayer].isHuman });
    }
  };

  computeBoard = () => {
    const arr = new Array(9).fill(undefined);

    return arr.map((_, index) => {
      if (this.state.game.players.X.moves.includes(index)) return 'X';
      if (this.state.game.players.O.moves.includes(index)) return 'O';
      return undefined;
    });
  };

  render() {
    return (
      <Board
        {...this.state}
        computeBoard={this.computeBoard}
        handleHumanMove={this.handleHumanMove}
        handleComputerMove={this.handleComputerMove}
      />
    );
  }
}

export default App;
