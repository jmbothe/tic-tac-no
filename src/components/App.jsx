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

let computerMoveTimeout;

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
    message: 'Choose your settings and then start the game.',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inPlay !== prevState.inPlay) {
      if (this.state.inPlay) {
        if (!this.state.game.players[this.state.game.activePlayer].isHuman) {
          this.handleHumanMove(Math.floor(Math.random() * Math.floor(9)));
        }
      }
    } else if (
      this.state.game.activePlayer !== prevState.game.activePlayer
      && !this.state.game.players[this.state.game.activePlayer].isHuman
      && !this.state.winner
      && this.state.inPlay
    ) {
      computerMoveTimeout = setTimeout(() => this.handleComputerMove(), 3000);
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
    this.setState(prevState => {
      const game = update(prevState.game, {
        activePlayer: {
          $set: 'X',
        },
        waitingPlayer: {
          $set: 'O',
        },
        players: {
          X: {
            moves: {
              $set: [],
            },
          },
          O: {
            moves: {
              $set: [],
            },
          },
        },
      });

      if (prevState.inPlay) {
        clearTimeout(computerMoveTimeout);

        return {
          game,
          loading: false,
          winner: undefined,
          inPlay: false,
          message: 'Choose your settings and then start the game.',
        };
      }
      return {
        game,
        winner: undefined,
        inPlay: true,
        message: prevState.game.players[prevState.game.activePlayer].isHuman ? `Player ${prevState.game.players[prevState.game.activePlayer].symbol} please make your move...` : `Player ${prevState.game.players[prevState.game.activePlayer].symbol} is making her move...`,
      };
    });
  };

  handleHumanMove = move => {
    this.setState(prevState => {
      const nextGameState = generateNextGameState(prevState.game, move);
      if (checkForGameOver(nextGameState)) {
        const winner = getWinner(nextGameState);
        const game = update(nextGameState, {
          activePlayer: {
            $set: 'X',
          },
          waitingPlayer: {
            $set: 'O',
          },
        });

        return {
          game,
          winner: winner || 'Nobody',
          message: `${winner
            || 'Nobody'} has won! Adjust your settings or play again!`,
          inPlay: false,
        };
      }
      return {
        game: nextGameState,
        loading: !nextGameState.players[nextGameState.activePlayer].isHuman,
        message: nextGameState.players[nextGameState.activePlayer].isHuman ? `Player ${nextGameState.players[nextGameState.activePlayer].symbol} please make your move...` : `Player ${nextGameState.players[nextGameState.activePlayer].symbol} is making her move...`,
      };
    });
  };

  handleComputerMove = () => {
    this.setState(prevState => {
      const nextGameState = generateNextGameState(
        prevState.game,
        getBestMove(prevState.game, JSON.parse(JSON.stringify(prevState.game))),
      );
      if (checkForGameOver(nextGameState)) {
        const winner = getWinner(nextGameState);
        const game = update(nextGameState, {
          activePlayer: {
            $set: 'X',
          },
          waitingPlayer: {
            $set: 'O',
          },
        });

        return {
          game,
          winner: winner || 'Nobody',
          loading: false,
          message: `${winner
            || 'Nobody'} has won! Adjust your settings or play again!`,
          inPlay: false,
        };
      }
      return {
        game: nextGameState,
        loading: !nextGameState.players[nextGameState.activePlayer].isHuman,
        message: nextGameState.players[nextGameState.activePlayer].isHuman ? `Player ${nextGameState.players[nextGameState.activePlayer].symbol} please make your move...` : `Player ${nextGameState.players[nextGameState.activePlayer].symbol} is making her move...`,
      };
    });
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
