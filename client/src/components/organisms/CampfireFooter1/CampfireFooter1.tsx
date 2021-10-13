/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Layout, Row, Col, Dropdown, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { Avatar } from '../../atoms/Avatar';
// import { AudioMeter } from '../../atoms/AudioMeter';
// import { RoomControls } from '../../atoms/RoomControls';
import {
  EmojiCool,
  EmojiSmiley,
  EmojiSweat,
  EmojiWink,
  RaiseHand,
  MuteMic,
  Mic1,
  Dots,
  // Close,
  // Refresh,
  // Mic,
  // MicOff,
  // Settings,
} from '../../atoms/Icons';
import { theme } from '../../../constants';

const { Footer } = Layout;

const StyledFooter = styled(Footer)`
  &&& {
    position: fixed !important;
    z-index: 2;
    width: 100% !important;
    bottom: 0 !important;
    padding: 0 !important;
    background-color: ${theme.colors.gray.gray29} !important;
  }
`;

const StyledRow = styled(Row)`
  &&& {
    justify-content: center !important;
  }
`;

const OptionContainer = styled.div`
  &&& {
    display: flex !important;
    align-items: center !important;
    cursor: pointer !important;
  }
`;

const IconLogo = styled.div`
  &&& {
    height: 50px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const EmojisWrapper = styled.div`
  &&& {
    width: 45px;
    height: 177px;
    position: fixed;
    z-index: 100;
    padding: 0;
    bottom: 7px;
    background-color: #424242;
    right: 50px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    display: ${(props: { isOpen?: boolean }) =>
      props.isOpen ? 'flex' : 'none'};
  }
`;

const EmojiButtonWrapper = styled.button`
  &&& {
    padding: 0;
    border: none;
    background-color: #424242;
    cursor: pointer;
    border-radius: 10px;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

const EmojiMainWrapper = styled.div`
  &&& {
    width: 45px;
    height: 45px;
    background-color: #424242;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const EmojiCol = styled(Col)`
  &&& {
    display: flex;
    align-items: center;
  }
`;

const RaiseHandBtnContent = styled.div`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #424242;
    border-radius: 10px;
    width: 45px;
    height: 45px;
    padding: 12px;
  }
`;

const RaiseHandLabel = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 112.7%;
    letter-spacing: 0.02em;
    color: ${theme.colors.mainWhite};
    margin-left: 16px;
  }
`;

const AvatarWrapper = styled.div`
  &&& {
    .styledAvatar {
      display: inline-block;
    }
    cursor: pointer;
  }
`;

const RaiseHandWrapper = styled.div`
  &&& {
    width: 59px;
    height: 59px;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.mainBlack};
  }
`;

const StyledMenu = styled(Menu)`
  &&& {
    border: 2px solid #000000;
    & .adminMenu {
      font-family: ${theme.fonts.fontFamily};
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.02em;

      color: ${theme.colors.mainBlack};
    }

    & .adminMenuList {
      font-family: ${theme.fonts.fontFamily};
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.02em;
      color: ${theme.colors.gray.gray989};
    }
  }
`;

const HiddenDropDownContainer = styled.div``;

const HiddenContainer = styled.div`
  &&& {
    width: 59px;
    height: 59px;
    position: absolute;
    top: 0;
  }
`;

const MuteLabel = styled.span``;

const UnLabel = styled.b`
  &&& {
    color: ${theme.colors.mainBlack};
  }
`;

const MicWrapper = styled(Col)`
  &&& {
    display: flex;
    align-items: center;
  }
`;

type Props = {
  id: string;
  profileUrl: string;
  isSpeaker?: boolean;
  isRaising?: boolean;
  // isTalking?: boolean;
  // isMuted?: boolean;
  onClickRaiseHand: (id: string, isRaising: boolean) => void;
  // onClickMuteMe?: (id: string, isMuted: boolean) => void;
  onClickEmoji?: (
    id: string,
    emojiType: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => void;
  onClickMic?: () => void;
  isAdmin?: boolean;
  onClickProfileMenu?: (key: string) => void;
};

const CampfireFooter1 = ({
  id,
  profileUrl,
  isSpeaker = false,
  isRaising = false,
  onClickRaiseHand,
  onClickEmoji = () => {},
  onClickMic = () => {},
  isAdmin = false,
  onClickProfileMenu = () => {},
}: Props): React.ReactElement => {
  const [onMute, setOnMute] = useState(false);
  const [onMenuProfile, setMenuProfile] = useState(false);
  const [isEmojisOpen, setEmojisOpen] = useState(false);
  // const [openSettings, setOpenSettings] = useState(false);
  // const history = useHistory();
  // const navigate = useNavigate();

  const raiseHandBtnStyle = {
    backgroundColor: theme.colors.gray.gray29,
    padding: 0,
    width: 45,
    height: '100%',
    marginLeft: 12,
  };

  const raisedHandBtnStyle = {
    backgroundColor: theme.colors.gray.gray29,
    textAlign: 'end',
    paddingRight: 24,
    height: '100%',
  };

  const emojiWinkStyle = { marginTop: 10 };

  const emojiSmileyStyle = { marginTop: -4 };

  const emojiSweatStyle = { marginTop: -6 };

  const overlayStyle = {
    paddingBottom: 30,
  };

  const adminMenu = (
    <StyledMenu
      onClick={(menuItem: any) => onClickProfileMenu(menuItem.key.toString())}>
      <Menu.Item className="adminMenu" disabled key="1">
        ADMIN MENU
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="muteAll">
        MUTE ALL
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="unmuteAll">
        <MuteLabel>
          <UnLabel>UN</UnLabel>MUTE ALL
        </MuteLabel>
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="kickAll">
        KICK ALL
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="leaveCampfire">
        LEAVE CAMPFIRE
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="endCampfire">
        END CAMPFIRE
      </Menu.Item>
    </StyledMenu>
  );

  const menu = (
    <StyledMenu
      onClick={(menuItem: any) => onClickProfileMenu(menuItem.key.toString())}>
      <Menu.Item className="adminMenu" disabled key="1">
        MENU
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="adminMenuList" key="leaveCampfire">
        LEAVE CAMPFIRE
      </Menu.Item>
    </StyledMenu>
  );

  const handleOnClickMic = () => {
    setOnMute(!onMute);
    onClickMic();
  };

  // const handleOnClickSettings = () => {
  //   setOpenSettings(!openSettings);
  // };

  const handleOnClickProfile = () => {
    setMenuProfile(!onMenuProfile);
  };

  const handleOnClickEmojisOpen = () => {
    setEmojisOpen(!isEmojisOpen);
  };

  useEffect(() => {
    const onClickEvent = (e: any) => {
      if (e.target && e.target.id !== '_profileMenu') {
        setMenuProfile(false);
      }
    };
    if (onMenuProfile) {
      window.addEventListener('click', onClickEvent);
    }
  }, [onMenuProfile]);

  useEffect(() => {
    const onClickEvent = (e: any) => {
      if (
        e.target &&
        // e.target.id !== '_emojis' &&
        e.target.className?.baseVal !== 'emoji-icon'
      ) {
        setEmojisOpen(false);
      }
    };
    if (isEmojisOpen) {
      window.addEventListener('click', onClickEvent);
    }
  }, [isEmojisOpen]);

  const handleNavigation = useCallback(() => {
    setMenuProfile(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <StyledFooter>
      <StyledRow>
        <Col flex="59px">
          <AvatarWrapper>
            <Avatar size={59} src={profileUrl} alt="Campfire" />
            {!isSpeaker && isRaising && (
              <RaiseHandWrapper>
                <RaiseHand width={28} height={40} />
              </RaiseHandWrapper>
            )}
          </AvatarWrapper>
        </Col>
        {isSpeaker && (
          <MicWrapper>
            <IconLogo onClick={handleOnClickMic}>
              {onMute ? (
                <MuteMic width={45} height={45} />
              ) : (
                <Mic1 width={45} height={45} />
              )}
            </IconLogo>
          </MicWrapper>
        )}
        <Col flex="auto">
          {!isSpeaker && (
            <Button
              style={
                isRaising && !isSpeaker ? raisedHandBtnStyle : raiseHandBtnStyle
              }
              onClick={() => onClickRaiseHand(id, isRaising)}>
              {!isSpeaker && isRaising ? (
                <RaiseHandLabel>MY HAND IS RAISED</RaiseHandLabel>
              ) : (
                <RaiseHandBtnContent>
                  <RaiseHand width={28} height={40} />
                </RaiseHandBtnContent>
              )}
            </Button>
          )}
        </Col>
        <EmojiCol>
          <EmojiMainWrapper onClick={handleOnClickEmojisOpen}>
            <EmojiSmiley width={38} height={35} />
          </EmojiMainWrapper>
          <EmojisWrapper isOpen={isEmojisOpen}>
            <EmojiButtonWrapper
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'wink')}>
              <EmojiWink style={emojiWinkStyle} width={38} height={36} />
            </EmojiButtonWrapper>
            <EmojiButtonWrapper
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'cool')}>
              <EmojiCool width={38} height={35} />
            </EmojiButtonWrapper>
            <EmojiButtonWrapper
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'sweat')}>
              <EmojiSweat style={emojiSweatStyle} width={35} height={45} />
            </EmojiButtonWrapper>
            <EmojiButtonWrapper
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'smile')}>
              <EmojiSmiley style={emojiSmileyStyle} width={38} height={35} />
            </EmojiButtonWrapper>
          </EmojisWrapper>
        </EmojiCol>
        <OptionContainer onClick={handleOnClickProfile}>
          <Dropdown
            placement="topCenter"
            overlayClassName="adminMenuDropdown"
            overlay={isAdmin ? adminMenu : menu}
            overlayStyle={overlayStyle}
            visible={onMenuProfile}>
            <HiddenDropDownContainer />
          </Dropdown>
          <HiddenContainer id="_profileMenu" />
          <IconLogo style={{ width: 50 }}>
            <Dots />
          </IconLogo>
        </OptionContainer>
      </StyledRow>
    </StyledFooter>
  );
};

export default CampfireFooter1;
