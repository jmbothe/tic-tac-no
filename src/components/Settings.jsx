import React from 'react';
import styled from 'styled-components';
import {
  Radio, Form, Button, Icon,
} from 'semantic-ui-react';
import { Consumer } from 'src/components/App.jsx';

const SettingsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1rem 0;

  @media (orientation: landscape) {
    width: 50%;
  }
`;

const MessageWrapper = styled.div`
  padding: 3rem 0;
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1rem;
`;

const Settings = () => (
  <Consumer>
    {({
      game, inPlay, loading, message, toggleSentience, toggleInPlay,
    }) => (
      <SettingsWrapper
        tabIndex="0"
        aria-label={`Game settings. ${
          inPlay
            ? 'Game is in play. Settings are disabled. Quit game to change settings'
            : ''
        }`}
      >
        <Form id="settings-form">
          <h3>Settings</h3>
          <Form.Field>
            <Radio
              toggle
              onChange={() => toggleSentience('X')}
              checked={!game.players.X.isHuman}
              label={`Player X is ${game.players.X.isHuman ? 'human' : 'AI'}`}
              aria-label={`Toggle player X sentience. Player X is ${
                game.players.X.isHuman ? 'human' : 'AI'
              }`}
              disabled={inPlay}
              htmlFor="settings-form"
            />
          </Form.Field>
          <Form.Field>
            <Radio
              toggle
              onChange={() => toggleSentience('O')}
              checked={!game.players.O.isHuman}
              label={`Player O is ${game.players.O.isHuman ? 'human' : 'AI'}`}
              aria-label={`Toggle player O sentience. Player O is ${
                game.players.O.isHuman ? 'human' : 'AI'
              }`}
              disabled={inPlay}
              htmlFor="settings-form"
            />
          </Form.Field>
          <Form.Field>
            <Button
              color={inPlay ? 'pink' : 'blue'}
              onClick={toggleInPlay}
              type="submit"
              htmlFor="settings-form"
            >
              {inPlay ? 'Quit Game' : 'Start Game'}
            </Button>
          </Form.Field>
        </Form>
        <MessageWrapper>
          <Icon
            name="circle notched"
            size="huge"
            loading={loading}
            color={
              (!inPlay && 'black')
              || (game.activePlayer === 'X' && 'pink')
              || 'blue'
            }
          />
          <span tabIndex="0">{message}</span>
        </MessageWrapper>
      </SettingsWrapper>
    )}
  </Consumer>
);

export default Settings;
