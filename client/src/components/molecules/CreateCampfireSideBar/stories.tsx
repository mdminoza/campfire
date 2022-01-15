import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireSideBar from './CreateCampfireSideBar';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampfireSideBar', module).add('default', () => {
  const [selected, setSelected] = useState('schedule');

  const onSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <StoryContainer>
      <CreateCampfireSideBar selected={selected} onClickItem={onSelect} />
    </StoryContainer>
  );
});
