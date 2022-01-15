import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireInline from './CreateCampfireInline';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampireInline', module).add('default', () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  return (
    <StoryContainer>
      <CreateCampfireInline
        profileUrl="https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
        onChangeTopic={setTopic}
        topicValue={topic}
        onChangeDescription={setDescription}
        descriptionValue={description}
        onClickCreate={() => console.log('Create campfire')}
      />
    </StoryContainer>
  );
});
