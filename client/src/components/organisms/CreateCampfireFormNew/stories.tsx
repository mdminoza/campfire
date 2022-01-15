import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireFormNew from './CreateCampfireFormNew';
import { StoryContainer } from './elements';

storiesOf('organism/CreateCampfireFormNew', module).add('default', () => (
  <StoryContainer>
    <CreateCampfireFormNew />
  </StoryContainer>
));
