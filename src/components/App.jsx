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
import { PRIMARY_TEXT } from 'src/styleConstants.js';
import Settings from './Settings.jsx';
import Board from './Board.jsx';
import Header from './Header.jsx';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  color: ${PRIMARY_TEXT};
`;

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  padding-top: 2rem;

  @media (orientation: landscape) {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-width: 960px;
  }
`;

let computerMoveTimeout;
export const { Provider, Consumer } = React.createContext();

class App extends Component {
  state = {
    game: initialGameState,
    loading: false,
    winner: undefined,
    inPlay: false,
    message: 'Choose your settings and then start the game.',
  };

  componentDidUpdate(_, prevState) {
    // If first move is from AI player, make a random move
    // to make viewing the game more interesting for humans
    if (
      this.state.inPlay !== prevState.inPlay
      && this.state.inPlay
      && !this.state.game.players[this.state.game.activePlayer].isHuman
    ) {
      setTimeout(
        () => this.handleMove(Math.floor(Math.random() * Math.floor(9))),
        3000,
      );

    // Render all other AI moves
    } else if (
      this.state.game.activePlayer !== prevState.game.activePlayer
      && !this.state.game.players[this.state.game.activePlayer].isHuman
      && !this.state.winner
      && this.state.inPlay
    ) {
      computerMoveTimeout = setTimeout(() => this.handleMove(), 3000);
    }
  }

  toggleSentience = player =>
    this.setState(prevState => ({
      game: update(prevState.game, {
        players: {
          [player]: {
            $toggle: ['isHuman'],
          },
        },
      }),
    }));

  toggleInPlay = () => {
    this.setState(prevState => {
      const activePlayer = prevState.game.players[prevState.game.activePlayer];
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
        loading: !activePlayer.isHuman,
        winner: undefined,
        inPlay: true,
        message: activePlayer.isHuman
          ? `Player ${activePlayer.symbol} please make your move...`
          : `Player ${activePlayer.symbol} is making her move...`,
      };
    });
  };

  // If activePlayer is AI, `move` param should be undefined
  handleMove = move => {
    this.setState(prevState => {
      const nextGameState = generateNextGameState(
        prevState.game,
        move
        // If move is undefined, run minmax algorithm to get best move
          || getBestMove(
            prevState.game,
            JSON.parse(JSON.stringify(prevState.game)),
          ),
      );
      if (checkForGameOver(nextGameState)) {
        const winner = getWinner(nextGameState) || 'Nobody';

        return {
          game: nextGameState,
          inPlay: false,
          winner,
          message: `${winner} has won! Adjust your settings or play again!`,
        };
      }
      const activePlayer = nextGameState.players[nextGameState.activePlayer];
      return {
        game: nextGameState,
        loading: !activePlayer.isHuman,
        message: activePlayer.isHuman
          ? `Player ${activePlayer.symbol} please make your move...`
          : `Player ${activePlayer.symbol} is making her move...`,
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
      <Provider
        value={{
          ...this.state,
          handleMove: this.handleMove,
          toggleInPlay: this.toggleInPlay,
          toggleSentience: this.toggleSentience,
          computeBoard: this.computeBoard,
        }}
      >
        <AppWrapper>
          <Header />
          <ContentWrapper>
            <Settings />
            <Board />
          </ContentWrapper>
        </AppWrapper>
      </Provider>
    );
  }
}

export default App;
