import React from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireFooter from './CreateCampfireFooter';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampfireFooter', module)
  .add('default', () => (
    <StoryContainer>
      <CreateCampfireFooter onClickGo={() => {}} />
    </StoryContainer>
  ))
  .add('has schedule', () => (
    <StoryContainer>
      <CreateCampfireFooter
        schedule="2:30 PM ON DECEMBER 19"
        onClickGo={() => {}}
      />
    </StoryContainer>
  ))
  .add('has invite', () => (
    <StoryContainer>
      <CreateCampfireFooter hasInvite onClickGo={() => {}} />
    </StoryContainer>
  ));
