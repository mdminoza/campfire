import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { InviteUserItemContainer, Container, LoaderWrapper } from './elements';
import { theme } from '../../../constants';
import { Avatar } from '../../atoms/Avatar';

type Props = {
  users: any[];
  onClick: (id: string) => void;
  isLoading?: boolean;
};

type InviteUserItemProps = {
  onClick: (value: string) => void;
  id: string;
  selected: boolean;
  name: string;
  profile: string;
};

const InviteUserItem = ({
  onClick,
  id,
  selected,
  name,
  profile,
}: InviteUserItemProps) => {
  const handleOnClick = () => onClick(id);

  return (
    <InviteUserItemContainer
      className={selected ? 'selected-user' : ''}
      onClick={handleOnClick}>
      <Avatar src={profile} />
      <span className={selected ? 'name-label-selected' : 'name-label'}>
        {name}
      </span>
    </InviteUserItemContainer>
  );
};

const loaderStyle = {
  fontSize: 23,
  color: theme.colors.mainBlack,
};

const CreateCampfireInviteList = ({
  users,
  onClick,
  isLoading = false,
}: Props): React.ReactElement => {
  const handleOnClick = (id: string) => {
    onClick(id);
  };

  return (
    <Container>
      {isLoading ? (
        <LoaderWrapper>
          <LoadingOutlined style={loaderStyle} />
        </LoaderWrapper>
      ) : (
        users.map((user: any) => (
          <InviteUserItem
            id={user.id}
            profile={user.avatar}
            name={user.username}
            onClick={handleOnClick}
            selected={user.selected}
          />
        ))
      )}
    </Container>
  );
};

export default CreateCampfireInviteList;
