import React from 'react';
import styled from 'styled-components';
import {
  Radio, Form, Button, Message, Icon,
} from 'semantic-ui-react';

const SettingsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0;
  flex-grow: 1;
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
        <Button onClick={() => props.toggleInPlay()}>
          {props.inPlay ? 'Quit Game' : 'Start Game'}
        </Button>
      </Form.Field>
    </Form>
    <Message icon>
      <Icon name="circle notched" loading={props.loading} />
      <Message.Content>
        {props.message}
      </Message.Content>
    </Message>
  </SettingsWrapper>
);

export default Settings;
