/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import { Container, ItemWrapper } from './elements';
import { Avatar } from '../../atoms/Avatar';

type Props = {
  profile?: string;
  onClickItem: (value: string) => void;
  selected?: string;
  invited?: number;
};

const CreateCampfireSideBar = ({
  profile = 'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
  selected = 'schedule',
  onClickItem,
  invited = 0,
}: Props): React.ReactElement => (
  <Container>
    <Avatar size={80} src={profile} />
    <ItemWrapper>
      <span
        className={selected === 'schedule' ? 'selected' : ''}
        role="button"
        onClick={() => onClickItem('schedule')}>
        Schedule
      </span>
      <span
        className={selected === 'invite' ? 'selected' : ''}
        role="button"
        onClick={() => onClickItem('invite')}>
        {`Invite ${invited > 0 ? `(${invited})` : ''}`}
      </span>
    </ItemWrapper>
  </Container>
);

export default CreateCampfireSideBar;
