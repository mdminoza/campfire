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
        username: 'Johnny',
        selected: false,
        avatar:
          'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
      },
      {
        id: 'qw33e',
        username: 'Steven',
        selected: false,
        avatar:
          'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
      },
      {
        id: '4rwer',
        username: 'Charles',
        selected: false,
        avatar:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      },
      {
        id: 'trett',
        username: 'Brent',
        selected: false,
        avatar:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      },
      {
        id: 'rghg',
        username: 'Abel',
        selected: false,
        avatar:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
      },
      {
        id: 'qemn42',
        username: 'Cain',
        selected: false,
        avatar:
          'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI',
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

  const sortedUsers = users.sort((a, b) =>
    a.username.localeCompare(b.username),
  );

  return (
    <StoryContainer>
      <CreateCampfireInviteList users={sortedUsers} onClick={handleOnClick} />
    </StoryContainer>
  );
});
