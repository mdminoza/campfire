import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Divider, Grid } from 'antd';
import styled from 'styled-components';

import { StyledLink } from '../../atoms/StyledLink';
// import { RoomControls } from '../../atoms/RoomControls';
import { TitleContent } from '../../molecules/TitleContent';
import { SpeakersArea } from '../../organisms/SpeakersArea';
import { CampfireFooter } from '../../organisms/CampfireFooter';
import { MembersList } from '../../organisms/MembersList';
import { MemberItemParams } from '../../molecules/MemberItem/types';

const ActiveSpeakersWrapper = styled.div`
  margin: -70px 0 24px;
  z-index: 1;
`;

const AudienceWrapper = styled.div`
  margin: 0 40px 150px;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LogoutButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  font-style: normal;
  font-weight: bold;
  font-size: 1.18rem;
  line-height: 25px;
  color: #828282;

  text-align: center;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 0 8px;
`;

type Props = {
  id: string;
  profileUrl: string;
  topic: string;
  description: string;
  selectedId: string;
  scheduleToStart?: Date | undefined;
  speakers: MemberItemParams[];
  members: MemberItemParams[];
  invites?: MemberItemParams[];
  isSpeaker: boolean;
  isRaising?: boolean;
  isTalking?: boolean;
  isMuted?: boolean;
  onClickRaiseHand: (id: string) => void;
  onClickMuteMe?: (id: string, isMuted: boolean) => void;
  onClickEmoji?: (
    id: string,
    emojiType: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => void;
  onClickLogout?: () => void;
  onClickMember: (id: string) => void;
  isDurationLoading?: boolean;
  duration?: string;
  onClickStartDuration?: (campfireId: string) => void;
  campfireId?: string;
  durationStartDate?: Date | undefined;
  isCreator?: boolean;
  onClickMic?: () => void;
};

const { useBreakpoint } = Grid;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ActiveTemplate = ({
  id,
  speakers,
  members,
  invites,
  profileUrl,
  topic,
  description,
  selectedId,
  isSpeaker = false,
  isRaising = false,
  isTalking = false,
  isMuted = false,
  onClickRaiseHand,
  onClickMuteMe = () => {},
  onClickEmoji = () => {},
  onClickLogout = () => {},
  onClickMember,
  onClickStartDuration = () => {},
  onClickMic = () => {},
  isDurationLoading = false,
  duration = '',
  campfireId = '',
  durationStartDate = undefined,
  isCreator = false,
  scheduleToStart,
}: Props) => {
  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [avatarSize, setAvatarSize] = useState<number>();
  const [breakPoint, setBreakPoint] = useState<string>('');
  const screens = useBreakpoint();

  const links = [
    {
      label: 'HOME',
      onClick: () => {},
      link: '',
      active: false,
    },
    {
      label: 'WATCH',
      onClick: () => {},
      link: '',
      active: false,
    },
    {
      label: 'CAMPFIRES',
      onClick: () => {},
      link: '',
      active: true,
    },
    {
      label: 'GROUPS',
      onClick: () => {},
      link: '',
      active: false,
    },
    {
      label: 'DISCUSSION',
      onClick: () => {},
      link: '',
      active: false,
    },
  ];

  useEffect(() => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-restricted-globals
    const screenWidth = screen.width;
    switch (breakPoint) {
      case 'xxl':
      case 'xl':
      case 'lg':
        if (members.length <= 1) {
          setAvatarSize(500);
        } else if (members.length <= 2) {
          setAvatarSize(screenWidth * 0.5);
        } else if (members.length <= 3) {
          setAvatarSize(250);
        } else if (members.length >= 4 && members.length <= 8) {
          setAvatarSize(200);
        } else if (members.length >= 9 && members.length >= 12) {
          setAvatarSize(150);
        } else if (members.length >= 13 && members.length >= 28) {
          setAvatarSize(120);
        } else if (members.length >= 29) {
          setAvatarSize(110);
        }
        break;
      case 'md':
        if (members.length <= 1) {
          setAvatarSize(300);
        } else if (members.length <= 2) {
          setAvatarSize(250);
        } else if (members.length <= 3) {
          setAvatarSize(200);
        } else if (members.length >= 4 && members.length <= 8) {
          setAvatarSize(150);
        } else if (members.length >= 9 && members.length >= 12) {
          setAvatarSize(120);
        } else if (members.length >= 13) {
          setAvatarSize(110);
        }
        break;
      case 'sm':
        console.log('AYALASM?');
        if (members.length <= 1) {
          setAvatarSize(250);
        } else if (members.length <= 2) {
          setAvatarSize(200);
        } else if (members.length <= 3) {
          setAvatarSize(150);
        } else if (members.length >= 4 && members.length <= 8) {
          setAvatarSize(120);
        } else if (members.length >= 9) {
          setAvatarSize(110);
        }
        break;
      case 'xs':
        console.log('XS usa ta dol');
        if (members.length === 1) {
          console.log('1', members.length);
          setAvatarSize(200);
        } else if (members.length <= 2) {
          console.log('2', members.length);
          setAvatarSize(150);
        } else if (members.length <= 3) {
          console.log('3', members.length);
          setAvatarSize(120);
        } else if (members.length >= 4) {
          console.log('4', members.length);
          setAvatarSize(110);
        }
        break;
      default:
        setAvatarSize(110);
        console.log('5');
    }
  }, [speakers, members.length, breakPoint]);

  useEffect(() => {
    const fooz = Object.entries(screens).filter((screen) => !!screen[1]);
    try {
      setBreakPoint(fooz[fooz.length - 1][0]);
    } catch (err) {
      console.log(err);
    }
  }, [screens]);

  const handleOnClickRaiseHand = (userId: string) => {
    onClickRaiseHand(userId);
  };

  const handleOnClickEmoji = (
    selectedUserId: string,
    type: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => onClickEmoji(selectedUserId, type);

  const handleOnClickMenu = (key: string) => {
    if (key === 'logout') {
      onClickLogout();
    }
  };

  const handleOnClickBurgerMenu = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const linkStyle = {
    marginBottom: 10,
  };

  return (
    <Layout>
      <TitleContent
        title={topic.toLocaleUpperCase()}
        description={description}
        onActive
        onClickStartDuration={onClickStartDuration}
        duration={duration}
        campfireId={campfireId}
        isDurationLoading={isDurationLoading}
        durationStartDate={durationStartDate}
        isCreator={isCreator}
        scheduleToStart={scheduleToStart}
      />
      <ActiveSpeakersWrapper>
        <SpeakersArea
          data={speakers || []}
          onClick={onClickMember}
          selectedId={selectedId}
          invites={invites}
          size={avatarSize}
        />
      </ActiveSpeakersWrapper>
      <AudienceWrapper>
        <MembersList
          onClick={onClickMember}
          selectedId={selectedId}
          data={members}
          size={avatarSize}
        />
      </AudienceWrapper>
      <CampfireFooter
        id={id}
        profileUrl={profileUrl}
        isMuted={isMuted}
        isRaising={isRaising}
        isSpeaker={isSpeaker}
        isTalking={isTalking}
        onClickRaiseHand={handleOnClickRaiseHand}
        onClickMuteMe={onClickMuteMe}
        onClickEmoji={handleOnClickEmoji}
        onClickMic={onClickMic}
      />
      <Drawer
        placement="right"
        closable={false}
        onClose={handleOnClickBurgerMenu}
        visible={isDrawerVisible}>
        <LinkWrapper>
          {links.map((item) => (
            <StyledLink
              label={item.label}
              onClick={item.onClick}
              to={item.link}
              active={item.active}
              style={linkStyle}
            />
          ))}
        </LinkWrapper>
        <Divider />
        <LogoutButton onClick={onClickLogout}>Logout</LogoutButton>
      </Drawer>
      {/* <RoomControls /> */}
    </Layout>
  );
};

export default ActiveTemplate;
