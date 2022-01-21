import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import JoinCampfire from './JoinCampfire';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
storiesOf('molecule/JoinCampfire', module)
  .add('default', () => (
    <Container>
      <JoinCampfire
        title="Study the bible"
        description="This is a great bible study"
        isStarted
      />
    </Container>
  ))
  .add('not started', () => (
    <Container>
      <JoinCampfire
        title="Study the bible"
        description="This is a great bible study"
      />
    </Container>
  ));
