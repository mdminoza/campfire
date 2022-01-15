import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireHeader from './CreateCampfireHeader';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampfireHeader', module).add('default', () => {
  const [checked, setCheck] = useState<boolean>(false);

  const onChangeCheckbox = () => setCheck(!checked);

  return (
    <StoryContainer>
      <CreateCampfireHeader
        onChangeCheckbox={onChangeCheckbox}
        topic="Test"
        description="Description"
        checked={checked}
        type={checked ? '' : 'hidden-type'}
      />
    </StoryContainer>
  );
});
