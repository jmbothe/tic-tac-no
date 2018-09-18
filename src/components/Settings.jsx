import React from 'react';
import styled from 'styled-components';
import {
  Radio, Form, Button, Icon,
} from 'semantic-ui-react';

const SettingsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 1rem 0;

  @media(orientation: landscape) {
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

const Settings = props => (
  <SettingsWrapper>
    <Form>
      <h3>Settings</h3>
      <Form.Field>
        <Radio
          toggle
          onChange={() => props.toggleSentience('X')}
          checked={!props.game.players.X.isHuman}
          label={`Player X is ${props.game.players.X.isHuman ? 'human' : 'AI'}`}
        />
      </Form.Field>
      <Form.Field>
        <Radio
          toggle
          onChange={() => props.toggleSentience('O')}
          checked={!props.game.players.O.isHuman}
          label={`Player O is ${props.game.players.O.isHuman ? 'human' : 'AI'}`}
        />
      </Form.Field>
      <Form.Field>
        <Button color={props.inPlay ? 'pink' : 'blue'} onClick={() => props.toggleInPlay()}>
          {props.inPlay ? 'Quit Game' : 'Start Game'}
        </Button>
      </Form.Field>
    </Form>
    <MessageWrapper>
      <Icon
        name="circle notched"
        size="huge"
        loading={props.loading}
        color={!props.inPlay ? 'black' : props.game.activePlayer === 'X' ? 'pink' : 'blue'}
      />
        <span>{props.message}</span>
    </MessageWrapper>
  </SettingsWrapper>
);

export default Settings;
