import React from 'react';
import styled from 'styled-components';
import {
  Radio, Form, Button, Message, Icon,
} from 'semantic-ui-react';

const SettingsWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Settings = props => (
  <SettingsWrapper>
    <Form>
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
        <Message.Header>Just one second</Message.Header>
        We are fetching that content for you.
      </Message.Content>
    </Message>
  </SettingsWrapper>
);

export default Settings;
