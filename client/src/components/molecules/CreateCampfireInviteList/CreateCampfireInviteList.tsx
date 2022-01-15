import React from 'react';

import { InviteUserItemContainer, Container } from './elements';

import { Avatar } from '../../atoms/Avatar';

type Props = {
  users: any[];
  onClick: (id: string) => void;
};

type InviteUserItemProps = {
  onClick: (value: string) => void;
  id: string;
  selected: boolean;
  name: string;
};

const InviteUserItem = ({
  onClick,
  id,
  selected,
  name,
}: InviteUserItemProps) => {
  const handleOnClick = () => onClick(id);

  return (
    <InviteUserItemContainer
      className={selected ? 'selected-user' : ''}
      onClick={handleOnClick}>
      <Avatar src="https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY" />
      <span className={selected ? 'name-label-selected' : 'name-label'}>
        {name}
      </span>
    </InviteUserItemContainer>
  );
};

const CreateCampfireInviteList = ({
  users,
  onClick,
}: Props): React.ReactElement => {
  const handleOnClick = (id: string) => {
    onClick(id);
  };

  return (
    <Container>
      {users.map((user: any) => (
        <InviteUserItem
          id={user.id}
          name={user.name}
          onClick={handleOnClick}
          selected={user.selected}
        />
      ))}
    </Container>
  );
};

export default CreateCampfireInviteList;
