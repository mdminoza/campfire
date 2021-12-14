/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Layout, Row, Col, Dropdown, Menu, Grid } from 'antd';
// import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { Avatar } from '../../atoms/Avatar';
import { coolEmoji, sweatEmoji, smileyEmoji, winkEmoji } from '../../../assets';
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

// const smileyEmoji = require('../../../assets/images/smileyEmoji.png');
// const sweatEmoji = require('../../../assets/images/sweatEmoji.png');
// const winkEmoji = require('../../../assets/images/winkEmoji.png');
// const coolEmoji = require('../../../assets/images/coolEmoji.png');

const { Footer } = Layout;

const StyledFooter = styled(Footer)`
  &&& {
    position: fixed !important;
    z-index: 2;
    width: 100% !important;
    bottom: 0 !important;
    padding: 0 !important;
    background-color: ${theme.colors.gray.gray29} !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

// const StyledFooter1 = styled(Footer)`
//   &&& {
//     position: fixed !important;
//     z-index: 2;
//     width: 100% !important;
//     bottom: 58px !important;
//     padding: 0 !important;
//     background-color: ${theme.colors.gray.gray29} !important;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
//   }
// `;

const StyledRow = styled(Row)`
  &&& {
    justify-content: center !important;
    flex-flow: row nowrap !important;
  }
`;

// const StyledRow1 = styled(Row)`
//   &&& {
//     justify-content: end !important;
//     flex-flow: row nowrap !important;
//   }
// `;

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
    background-color: transparent;
    cursor: pointer;
    border-radius: 10px;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

// const EmojiButtonWrapper1 = styled.button`
//   &&& {
//     padding: 0;
//     border: none;
//     background-color: transparent;
//     cursor: pointer;
//     border-radius: 10px;
//     &:focus {
//       outline: none;
//       box-shadow: none;
//     }
//   }
// `;

const EmojiMainWrapper = styled.div`
  &&& {
    width: 45px !important;
    height: 45px !important;
    background-color: #424242 !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    border: none !important;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

const EmojiCol = styled(Col)`
  &&& {
    display: flex;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;

// const EmojiCol1 = styled(Col)`
//   &&& {
//     display: flex;
//     align-items: center;
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
//   }
// `;

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
    font-size: ${(props: { xs?: boolean }) => (props.xs ? 12 : 16)}px;
    line-height: 112.7%;
    letter-spacing: 0.02em;
    color: ${theme.colors.mainWhite};
    margin-left: ${(props: { xs?: boolean }) => (props.xs ? 0 : 16)}px;
    overflow: hidden !important;
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

const { useBreakpoint } = Grid;

type Props = {
  id: string;
  profileUrl: string;
  isSpeaker?: boolean;
  isRaising?: boolean;
  micEnabled?: boolean;
  onMute?: boolean;
  // isTalking?: boolean;
  // isMuted?: boolean;
  onClickRaiseHand: (id: string, isRaising: boolean) => void;
  // onClickMuteMe?: (id: string, isMuted: boolean) => void;
  onClickEmoji?: (
    id: string,
    emojiType: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => void;
  onClickMic?: (val: boolean) => void;
  isAdmin?: boolean;
  onClickProfileMenu?: (key: string) => void;
};

const CampfireFooter1 = ({
  id,
  profileUrl,
  isSpeaker = false,
  isRaising = false,
  micEnabled = true,
  onClickRaiseHand,
  onClickEmoji = () => {},
  onClickMic = () => {},
  isAdmin = false,
  onMute = false,
  onClickProfileMenu = () => {},
}: Props): React.ReactElement => {
  // const [onMute, setOnMute] = useState(false);
  const [onMenuProfile, setMenuProfile] = useState(false);
  const [isEmojisOpen, setEmojisOpen] = useState(false);
  // const [openSettings, setOpenSettings] = useState(false);
  // const history = useHistory();`
  // const navigate = useNavigate();
  const screens = useBreakpoint();
  const { xs } = screens;

  const raiseHandBtnStyle = {
    backgroundColor: theme.colors.gray.gray29,
    padding: 0,
    width: 45,
    height: '100%',
    marginLeft: micEnabled ? 0 : 12,
  };

  const raisedHandBtnStyle = {
    backgroundColor: theme.colors.gray.gray29,
    textAlign: 'start',
    paddingRight: xs ? 15 : 24,
    paddingLeft: xs ? 0 : 15,
    height: '100%',
    width: '100% !important',
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
      <Menu.Item className="adminMenuList" key="silenceAll">
        SILENCE ALL
      </Menu.Item>
      <Menu.Item className="adminMenuList" key="unsilenceAll">
        <MuteLabel>
          <UnLabel>UN</UnLabel>SILENCE ALL
        </MuteLabel>
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
      {/* <Menu.Item className="adminMenuList" key="kickAll">
        KICK ALL
      </Menu.Item> */}
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
    // setOnMute(!onMute);
    onClickMic(!onMute);
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
        e.target.className !== 'emoji-icon'
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
    <>
      {/* <StyledFooter1>
        <StyledRow1>
          <EmojiCol1>
            <EmojiButtonWrapper1
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'wink')}>
              <EmojiWink style={emojiWinkStyle} width={38} height={36} />
            </EmojiButtonWrapper1>
            <EmojiButtonWrapper1
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'cool')}>
              <EmojiCool width={38} height={35} />
            </EmojiButtonWrapper1>
            <EmojiButtonWrapper1
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'sweat')}>
              <EmojiSweat style={emojiSweatStyle} width={35} height={45} />
            </EmojiButtonWrapper1>
            <EmojiButtonWrapper1
              id="_emojimains"
              onClick={() => onClickEmoji(id, 'smile')}>
              <EmojiSmiley style={emojiSmileyStyle} width={38} height={35} />
            </EmojiButtonWrapper1>
          </EmojiCol1>
        </StyledRow1>
      </StyledFooter1> */}
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
          {/* {isSpeaker && (
            <MicWrapper>
              <IconLogo onClick={handleOnClickMic}>
                {onMute ? (
                  <MuteMic width={45} height={45} />
                ) : (
                  <Mic1 width={45} height={45} />
                )}
              </IconLogo>
            </MicWrapper>
          )} */}
          {micEnabled && (
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
                  isRaising && !isSpeaker
                    ? raisedHandBtnStyle
                    : raiseHandBtnStyle
                }
                onClick={() => onClickRaiseHand(id, isRaising)}>
                {!isSpeaker && isRaising ? (
                  <RaiseHandLabel xs={xs}>
                    {xs ? 'HAND IS RAISED' : 'MY HAND IS RAISED'}
                  </RaiseHandLabel>
                ) : (
                  <RaiseHandBtnContent>
                    <RaiseHand width={28} height={40} />
                  </RaiseHandBtnContent>
                )}
              </Button>
            )}
          </Col>
          <EmojiCol>
            <EmojiMainWrapper
              className="emoji-icon"
              onClick={handleOnClickEmojisOpen}>
              {/* <EmojiSmiley width={38} height={35} /> */}
              <img
                className="emoji-icon"
                // src={'/static/media/smileyEmoji.80685b2f.png' || smileyEmoji}
                // src={`${window.location.origin}${smileyEmoji}`}
                src={smileyEmoji}
                alt=""
                style={{ width: 35, height: 35 }}
              />
            </EmojiMainWrapper>
            <EmojisWrapper isOpen={isEmojisOpen}>
              <EmojiButtonWrapper
                id="_emojimains"
                className="emoji-icon"
                onClick={() => onClickEmoji(id, 'wink')}>
                <img
                  className="emoji-icon"
                  // src={`${window.location.origin}${winkEmoji}`}
                  src={winkEmoji}
                  alt=""
                  style={{ width: 35, height: 35 }}
                />
                {/* <EmojiWink style={emojiWinkStyle} width={38} height={36} /> */}
              </EmojiButtonWrapper>
              <EmojiButtonWrapper
                id="_emojimains"
                className="emoji-icon"
                onClick={() => onClickEmoji(id, 'cool')}>
                <img
                  className="emoji-icon"
                  // src={`${window.location.origin}${coolEmoji}`}
                  src={coolEmoji}
                  alt=""
                  style={{ width: 35, height: 35 }}
                />
                {/* <EmojiCool width={38} height={35} /> */}
              </EmojiButtonWrapper>
              <EmojiButtonWrapper
                id="_emojimains"
                className="emoji-icon"
                onClick={() => onClickEmoji(id, 'sweat')}>
                <img
                  className="emoji-icon"
                  // src={`${window.location.origin}${sweatEmoji}`}
                  src={sweatEmoji}
                  alt=""
                  style={{ width: 35, height: 35 }}
                />
                {/* <EmojiSweat style={emojiSweatStyle} width={35} height={45} /> */}
              </EmojiButtonWrapper>
              <EmojiButtonWrapper
                id="_emojimains"
                className="emoji-icon"
                onClick={() => onClickEmoji(id, 'smile')}>
                <img
                  className="emoji-icon"
                  // src={`${window.location.origin}${smileyEmoji}`}
                  src={smileyEmoji}
                  alt=""
                  style={{ width: 35, height: 35 }}
                />
                {/* <EmojiSmiley style={emojiSmileyStyle} width={38} height={35} /> */}
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
    </>
  );
};

export default CampfireFooter1;
