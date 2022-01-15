import React, { useEffect, useState } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireInviteList from './CreateCampfireInviteList';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampfireInviteList', module).add('default', () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setUsers([
      {
        id: 'bvn88',
        name: 'Johnny',
        selected: false,
      },
      {
        id: 'qw33e',
        name: 'Steven',
        selected: false,
      },
      {
        id: '4rwer',
        name: 'Charles',
        selected: false,
      },
      {
        id: 'trett',
        name: 'Brent',
        selected: false,
      },
      {
        id: 'rghg',
        name: 'Abel',
        selected: false,
      },
      {
        id: 'qemn42',
        name: 'Cain',
        selected: false,
      },
    ]);
  }, []);

  const handleOnClick = (id: string) => {
    const selectedUser = users.find((user) => user.id === id);
    const filtered = users.filter((user) => user.id !== id);
    setUsers([
      ...filtered,
      {
        ...selectedUser,
        selected: !selectedUser.selected,
      },
    ]);
  };

  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <StoryContainer>
      <CreateCampfireInviteList users={sortedUsers} onClick={handleOnClick} />
    </StoryContainer>
  );
});
