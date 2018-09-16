import React, { Component } from 'react';
import update from 'immutability-helper';
import styled from 'styled-components';
import {
  initialGameState,
  generateNextGameState,
  checkForGameOver,
  getWinner,
} from 'src/game/tic_tac_toe.js';
import { getBestMove } from 'src/game/perfect_player.js';
import Settings from './Settings.jsx';
import Board from './Board.jsx';
import Header from './Header.jsx';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;

  @media (orientation: landscape) {
    flex-direction: row;
    justify-content: space-around;
    max-width: 1080px;
  }
`;

class App extends Component {
  state = {
    game: initialGameState,
    loading: false,
    winner: undefined,
    inPlay: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.game.activePlayer !== prevState.game.activePlayer
      && !this.state.game.players[this.state.game.activePlayer].isHuman
      && !this.state.winner
    ) {
      setTimeout(() => this.handleComputerMove(), 2000);
    }
  }

  toggleSentience = player => {
    this.setState(prevState => {
      const game = update(prevState.game, {
        players: {
          [player]: {
            isHuman: { $set: !prevState.game.players[player].isHuman },
          },
        },
      });
      return { game };
    });
  };

  toggleInPlay = () => {
    if (this.state.inPlay) {
      this.setState({
        game: initialGameState,
        loading: false,
        winner: undefined,
        inPlay: false,
      });
    } else {
      this.setState({ inPlay: true }, () => {
        if (!this.state.game.players[this.state.game.activePlayer].isHuman) {
          if (!this.state.game.players[this.state.game.waitingPlayer].isHuman) {
            this.handleHumanMove(Math.floor(Math.random() * Math.floor(9)));
          } else {
            this.handleComputerMove();
          }
        }
      });
    }
  };

  handleHumanMove = move => {
    const nextGameState = generateNextGameState(this.state.game, move);
    if (checkForGameOver(nextGameState)) {
      const winner = getWinner(nextGameState);
      this.setState({ game: nextGameState, winner: winner || 'Nobody' });
    } else {
      this.setState({
        game: nextGameState,
        loading: !nextGameState.players[nextGameState.activePlayer].isHuman,
      });
    }
  };

  handleComputerMove = () => {
    const nextGameState = generateNextGameState(
      this.state.game,
      getBestMove(this.state.game, JSON.parse(JSON.stringify(this.state.game))),
    );
    if (checkForGameOver(nextGameState)) {
      const winner = getWinner(nextGameState);
      this.setState({
        game: nextGameState,
        winner: winner || 'Nobody',
        loading: false,
      });
    } else {
      this.setState({
        game: nextGameState,
        loading: !nextGameState.players[nextGameState.activePlayer].isHuman,
      });
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
      <AppWrapper>
        <Header />
        <ContentWrapper>
        <Settings
          {...this.state}
          toggleSentience={this.toggleSentience}
          toggleInPlay={this.toggleInPlay}
        />
        <Board
          {...this.state}
          computeBoard={this.computeBoard}
          handleHumanMove={this.handleHumanMove}
          handleComputerMove={this.handleComputerMove}
        />
        </ContentWrapper>
      </AppWrapper>
    );
  }
}

export default App;
