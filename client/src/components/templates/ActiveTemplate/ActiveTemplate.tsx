import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Divider, Grid } from 'antd';
import styled from 'styled-components';

import { StyledLink } from '../../atoms/StyledLink';
// import { RoomControls } from '../../atoms/RoomControls';
import { TitleContent } from '../../molecules/TitleContent';
import { SpeakersArea } from '../../organisms/SpeakersArea';
import { CampfireFooter } from '../../organisms/CampfireFooter';
import { MembersList } from '../../organisms/MembersList';
// import { MemberItemParams } from '../../molecules/MemberItem/types';
import { DUMMY_MEMBERS } from './stories';

const ActiveSpeakersWrapper = styled.div`
  margin: -70px 0 24px;
  z-index: 1;
`;

const AudienceWrapper = styled.div`
  margin: 0 40px 150px;
  @media (min-width: 500px) {
    margin: 0 10px 100px;
  }
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

// type Props = {
//   id: string;
//   profileUrl: string;
//   topic: string;
//   description: string;
//   selectedId: string;
//   scheduleToStart?: Date | undefined;
//   speakers: MemberItemParams[];
//   members: MemberItemParams[];
//   invites?: MemberItemParams[];
//   isSpeaker: boolean;
//   isRaising?: boolean;
//   isTalking?: boolean;
//   isMuted?: boolean;
//   onClickRaiseHand: (id: string) => void;
//   onClickMuteMe?: (id: string, isMuted: boolean) => void;
//   onClickEmoji?: (
//     id: string,
//     emojiType: 'wink' | 'smile' | 'sweat' | 'cool',
//   ) => void;
//   onClickLogout?: () => void;
//   onClickMember: (id: string) => void;
//   isDurationLoading?: boolean;
//   duration?: string;
//   onClickStartDuration?: (campfireId: string) => void;
//   // campfireId?: string;
//   durationStartDate?: Date | undefined;
//   // isCreator?: boolean;
//   onClickMic?: () => void;
// };

const { useBreakpoint } = Grid;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ActiveTemplate = () => {
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

  const members = [...DUMMY_MEMBERS].splice(0, 9);
  const speakers = [...DUMMY_MEMBERS].splice(0, 1);
  const id = '';

  useEffect(() => {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-restricted-globals
    const screenWidth = screen.width;
    const size =
      members.length > speakers.length ? members.length : speakers.length;
    switch (breakPoint) {
      case 'xxl':
      case 'xl':
      case 'lg':
        if (size <= 1) {
          setAvatarSize(screenWidth * 0.4);
        } else if (size <= 2) {
          setAvatarSize(screenWidth * 0.35);
        } else if (size <= 3) {
          setAvatarSize(screenWidth * 0.3);
        } else if (size >= 4 && size <= 8) {
          setAvatarSize(screenWidth * 0.2);
        } else if (size >= 9 && size <= 12) {
          setAvatarSize(screenWidth * 0.14);
        } else if (size >= 13 && size <= 28) {
          setAvatarSize(screenWidth * 0.12);
        } else if (size >= 29) {
          setAvatarSize(screenWidth * 0.11);
        }
        break;
      case 'md':
        console.log('MD!!');
        if (size <= 1) {
          setAvatarSize(screenWidth * 0.4);
        } else if (size <= 2) {
          setAvatarSize(screenWidth * 0.35);
        } else if (size <= 3) {
          setAvatarSize(screenWidth * 0.2);
          setAvatarSize(200);
        } else if (size >= 4 && size <= 8) {
          setAvatarSize(150);
        } else if (size >= 9 && size >= 12) {
          setAvatarSize(120);
        } else if (size >= 13) {
          setAvatarSize(110);
        }
        break;
      case 'sm':
        console.log('AYALASM?');
        if (size <= 1) {
          setAvatarSize(250);
        } else if (size <= 2) {
          setAvatarSize(200);
        } else if (size <= 3) {
          setAvatarSize(150);
        } else if (size >= 4 && size <= 8) {
          setAvatarSize(120);
        } else if (size >= 9) {
          setAvatarSize(110);
        }
        break;
      case 'xs':
        console.log('XS usa ta dol');
        if (size === 1) {
          console.log('1', size);
          setAvatarSize(200);
        } else if (size <= 2) {
          console.log('2', size);
          setAvatarSize(150);
        } else if (size <= 3) {
          console.log('3', size);
          setAvatarSize(120);
        } else if (size >= 4) {
          console.log('4', size);
          setAvatarSize(110);
        }
        break;
      default:
        setAvatarSize(110);
        console.log('5');
    }
  }, [speakers, members.length, speakers.length, breakPoint]);

  useEffect(() => {
    const fooz = Object.entries(screens).filter((screen) => !!screen[1]);
    try {
      setBreakPoint(fooz[fooz.length - 1][0]);
    } catch (err) {
      console.log(err);
    }
  }, [screens]);

  const handleOnClickEmoji = (
    selectedUserId: string,
    type: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => console.log(selectedUserId, type);

  const handleOnClickBurgerMenu = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const linkStyle = {
    marginBottom: 10,
  };

  return (
    <Layout>
      <TitleContent
        title="Bike for Jesus"
        description="Description"
        onActive
        onClickStartDuration={() => console.log('campfireId')}
        duration="duration"
        campfireId=""
        isDurationLoading={false}
        durationStartDate={undefined}
        isCreator={false}
        scheduleToStart={undefined}
      />
      <ActiveSpeakersWrapper>
        <SpeakersArea
          data={speakers || []}
          onClick={() => console.log(id)}
          selectedId=""
          invites={[]}
          size={avatarSize}
        />
      </ActiveSpeakersWrapper>
      <AudienceWrapper>
        <MembersList
          onClick={() => console.log(id)}
          selectedId=""
          data={members}
          size={avatarSize}
        />
      </AudienceWrapper>
      <CampfireFooter
        id={id}
        profileUrl="https://dummyimage.com/263x263/4a4a4a/ffffff"
        isMuted={false}
        isRaising={false}
        isSpeaker={false}
        isTalking={false}
        onClickRaiseHand={() => console.log(id)}
        onClickMuteMe={() => console.log(id, false)}
        onClickEmoji={handleOnClickEmoji}
        onClickMic={() => console.log('mic pressed!')}
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
      </Drawer>
      {/* <RoomControls /> */}
    </Layout>
  );
};

export default ActiveTemplate;
