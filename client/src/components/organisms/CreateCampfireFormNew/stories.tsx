import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import CreateCampfireFormNew from './CreateCampfireFormNew';
import { StoryContainer } from './elements';

storiesOf('organism/CreateCampfireFormNew', module).add('default', () => {
  const [toggle, setToggle] = useState(false);
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

  const sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

  const onClickInviteUser = (id: string) => {
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

  const onClickSelectAll = () => {
    const selectedUser = users.map((user) => ({
      ...user,
      selected: true,
    }));
    setUsers(selectedUser);
  };

  const selectedUsers = users.filter((user) => user.selected);

  const onClickCreate = () => setToggle(!toggle);

  return (
    <StoryContainer>
      <CreateCampfireFormNew
        onClickInviteUser={onClickInviteUser}
        onClickSelectAll={onClickSelectAll}
        members={sortedUsers}
        selectedMembers={selectedUsers}
        onClickCreate={onClickCreate}
        toggle={toggle}
        onSubmit={(values: any) => console.log(values)}
      />
    </StoryContainer>
  );
});
