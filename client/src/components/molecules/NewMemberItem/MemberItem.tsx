import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Card, Menu, Dropdown } from 'antd';

import { Avatar } from '../../atoms/Avatar';
import {
  RaiseHand,
  // SpeakerStatus,
  // SpeakerActiveStatus,
  // Asterisks,
  BlackCrown,
  MuteMicMember,
} from '../../atoms/Icons';

import { theme } from '../../../constants';

const StyledCard = styled(Card)<{ isSpeaker: boolean; isMuted: boolean }>`
  &&& {
    border-radius: 20px 20px 10px 10px;
    .ant-card-body {
      padding: 0;
      border-radius: 0 0 10px 10px;
      text-align: center;
      padding-bottom: 5px;
    }
    &:hover {
      background: ${(props) =>
        // eslint-disable-next-line no-nested-ternary
        props.isSpeaker
          ? theme.colors.orange1
          : props.isMuted
          ? theme.colors.gray.grayb8
          : theme.colors.mainWhite};
    }
    .ant-card-head {
      padding: 0;
      margin-bottom: 0;
      border: none;
      border-radius: 0;
    }

    .ant-card-head-title {
      padding: 0;
      border-radius: 20px;
    }
  }
`;

const LabelName = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: ${(props: {
      isActive?: boolean;
      isModerator?: boolean;
      isMuted?: boolean;
    }) => (props.isActive ? 'bold' : 'normal')};
    margin-top: 14px;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.02em;
    color: ${(props: {
      isActive?: boolean;
      isModerator?: boolean;
      isMuted?: boolean;
    }) => (props.isMuted ? 'red' : theme.colors.mainBlack)};
  }
`;

const AvatarWrapper = styled.div``;

const VideoWrapper = styled.video`
  &&& {
    width: ${(props: { size?: number }) =>
      props.size ? `${props.size}px` : `110px`};
    height: ${(props: { size?: number }) =>
      props.size ? `${props.size + 38}px` : `148px`};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

// const BorderActive = styled.div`
//   width: ${(props: { isActive?: boolean; size?: number }) =>
//     props.size ? props.size + 'px' : `110px`};
//   height: ${(props: { isActive?: boolean; size?: number }) =>
//     props.size ? props.size + 'px' : `110px`};
//   position: absolute;
//   border: ${(props: { isActive?: boolean; size?: number }) =>
//     props.isActive ? `5px solid ${theme.colors.blue.primary}` : 'none'};
//   top: 0;
// `;

const BorderActive = styled.div<{
  isSpeaker?: boolean;
  isMuted?: boolean;
  size?: number;
}>`
  &&& {
    width: ${(props) => (props.size ? `${props.size}px` : `110px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `110px`)};
    position: absolute;
    border-width: 5px;
    border-style: solid;
    border-color: ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props.isSpeaker
        ? theme.colors.orange1
        : props.isMuted
        ? theme.colors.gray.grayb8
        : theme.colors.mainWhite};
    top: 0;
    border-radius: 10px;
  }
`;

const RaiseHandWrapper = styled.div`
  &&& {
    width: ${(props: { size?: number }) =>
      props.size ? `${props.size}px` : `110px`};
    height: ${(props: { size?: number }) =>
      props.size ? `${props.size}px` : `110px`};
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// const MutedWrapper = styled.div`
//   width: ${(props: { size?: number }) =>
//     props.size ? props.size + 'px' : `110px`};
//   height: ${(props: { size?: number }) =>
//     props.size ? props.size + 'px' : `110px`};
//   position: absolute;
//   top: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: #dcdcdca6;
// `;

const ActiveWrapper = styled.div`
  &&& {
    width: ${(props: { size?: number }) =>
      props.size ? `${props.size + 15}px` : `125px`};
    height: ${(props: { size?: number }) =>
      props.size ? `${props.size + 15}px` : `125px`};
    position: absolute;
    top: -7px;
    left: -7px;
    display: flex;
    align-items: center;
    justify-con1tent: center;
  }
`;

const StyledMenu = styled(Menu)`
  &&& {
    border: 2px solid #000000;
    .adminMenu {
      font-family: ${theme.fonts.fontFamily};
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.02em;

      color: ${theme.colors.mainBlack};
    }

    .adminMenuList {
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
    width: ${(props: { size?: number }) =>
      props.size ? `${props.size}px` : `110px`};
    height: ${(props: { size?: number }) =>
      props.size ? `${props.size + 38}px` : `148px`};
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

type Props = {
  isActive?: boolean;
  isSpeaker?: boolean;
  isModerator?: boolean;
  isRaising?: boolean;
  isMuted?: boolean;
  onClick: (id: string) => void;
  onClickMenu: (key: string) => void;
  speaker: string;
  profileUrl: string;
  id: string;
  selectedId?: string;
  size?: number;
  isLoggedIn?: boolean;
  isLocal?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  peer?: any;
  stream?: any;
};

const MemberItem = ({
  isActive,
  isSpeaker,
  isModerator = false,
  isMuted = false,
  isRaising,
  onClick,
  speaker,
  onClickMenu,
  profileUrl,
  id,
  selectedId,
  size,
  isLoggedIn = false,
  peer = null,
  isLocal = false,
  stream,
}: Props): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const ref = useRef<any>();
  const videoRef = useRef<
    | {
        srcObject: null;
        play: any;
        onloadedmetadata: any;
      }
    | any
  >();

  // useEffect(() => {
  //   if (peer && !isLoggedIn) {
  //     peer.on('stream', (pstream: any) => {
  //       ref.current.srcObject = pstream;
  //     });
  //   }
  // }, [peer, isLoggedIn]);

  useEffect(() => {
    if (stream && stream.id) {
      const remoteVideoStream = videoRef.current;
      // eslint-disable-next-line dot-notation
      remoteVideoStream.srcObject = stream;

      remoteVideoStream.onloadedmetadata = () => {
        remoteVideoStream.play();
      };
    }
  }, [stream]);

  const menu = (
    <StyledMenu
      onClick={(menuItem: any) => onClickMenu(menuItem.key.toString())}>
      <Menu.Item className="adminMenu" disabled key="1">
        ADMIN MENU
      </Menu.Item>
      <Menu.Divider />
      {(isSpeaker || isModerator) &&
        (isMuted ? (
          <>
            <Menu.Item className="adminMenuList" key="unmute">
              <MuteLabel>
                <UnLabel>UN</UnLabel>MUTE
              </MuteLabel>
            </Menu.Item>
            <Menu.Divider />
          </>
        ) : (
          <>
            <Menu.Item className="adminMenuList" key="mute">
              MUTE
            </Menu.Item>
            <Menu.Divider />
          </>
        ))}

      <Menu.Item className="adminMenuList" key="kick">
        KICK
      </Menu.Item>
      <Menu.Divider />
      {isSpeaker && !isModerator && (
        <>
          <Menu.Item className="adminMenuList" key="addModerator">
            ADD MODERATOR
          </Menu.Item>
          <Menu.Item className="adminMenuList" key="removeSpeaker">
            REMOVE AS SPEAKER
          </Menu.Item>
        </>
      )}
      {isModerator && isSpeaker && (
        <>
          <Menu.Item className="adminMenuList" key="removeModerator">
            REMOVE AS MODERATOR
          </Menu.Item>
          <Menu.Item className="adminMenuList" key="removeSpeaker">
            REMOVE AS SPEAKER
          </Menu.Item>
        </>
      )}
      {!isModerator && !isSpeaker && (
        <>
          <Menu.Item className="adminMenuList" key="addModerator">
            ADD MODERATOR
          </Menu.Item>
          <Menu.Item className="adminMenuList" key="addSpeaker">
            ADD SPEAKER
          </Menu.Item>
        </>
      )}
    </StyledMenu>
  );

  const cardBodyStyle = {
    paddingVertical: 8,
    paddingHorizontal: 0,
  } as React.CSSProperties;

  const iconStyle = {
    position: 'absolute',
    zIndex: 1,
    bottom: 44,
    left: 5,
    background: 'white',
    padding: 4,
  };

  const muteMicIconStyle = {
    position: 'absolute',
    zIndex: 1,
    bottom: 39,
    right: 5,
    padding: 1,
  };

  // const mutedIconStyle = {
  //   ...iconStyle,
  //   left: 0,
  // };

  const cardStyle = {
    width: size || 110,
  };

  const overlayStyle = {
    paddingTop: 45,
  };

  const handleClick = () => onClick(id);

  const asterisksStyle = {
    ...iconStyle,
    height: 20,
    width: 20,
    right: 0,
  };

  const moderatorStyle = {
    position: 'absolute',
    zIndex: 1,
    bottom: 30,
    right: 4,
    // eslint-disable-next-line no-nested-ternary
    background: isSpeaker
      ? theme.colors.orange1
      : isMuted
      ? theme.colors.gray.grayb8
      : theme.colors.mainWhite,
    borderTopLeftRadius: 5,
    padding: 4,
    height: 18,
    width: 18,
    fill: isSpeaker ? theme.colors.mainWhite : theme.colors.mainBlack,
  };

  const muteMicStyle = {
    ...muteMicIconStyle,
    height: 30,
    width: 30,
    right: 0,
  };

  return (
    <StyledCard
      onClick={handleClick}
      hoverable
      isMuted={isMuted}
      isSpeaker={!!isSpeaker}
      style={cardStyle}
      bordered={false}
      bodyStyle={cardBodyStyle}
      title={
        <AvatarWrapper>
          <Dropdown
            overlayClassName="adminMenuDropdown"
            overlay={menu}
            overlayStyle={overlayStyle}
            visible={selectedId === id}>
            <HiddenDropDownContainer />
          </Dropdown>
          {/* {isSpeaker &&
            (isActive ? (
              <SpeakerActiveStatus width={20} height={20} style={iconStyle} />
            ) : (
              <SpeakerStatus width={20} height={20} style={iconStyle} />
            ))} */}
          {/* {isSpeaker && isActive && !isMuted && (
            <BlackCrown width={20} height={20} style={iconStyle} />
          )} */}

          {/* {isMuted && (
            <SpeakerStatus width={20} height={20} style={mutedIconStyle} />
          )} */}

          {isModerator && <BlackCrown style={moderatorStyle} />}

          {/* {isMuted && <MuteMicMember style={muteMicStyle} />} */}

          <Avatar src={profileUrl} size={size || 110} alt="Sample" />
          <BorderActive isSpeaker={isSpeaker} isMuted={isMuted} size={size} />
          {!isSpeaker && isRaising && (
            <RaiseHandWrapper size={size}>
              <RaiseHand width={30} height={45} />
            </RaiseHandWrapper>
          )}
          {/* {isMuted && <MutedWrapper />} */}
          {(isSpeaker || isModerator) && <ActiveWrapper size={size} />}
          <HiddenContainer id="_memberCard" size={size} />
          <VideoWrapper
            size={size}
            playsInline
            autoPlay
            // muted={isLocal ? true : !(isSpeaker || isModerator)}
            muted={isLocal}
            ref={videoRef}
          />
        </AvatarWrapper>
      }>
      <LabelName isActive={false} isMuted={false}>
        {speaker}
      </LabelName>
    </StyledCard>
  );
};

export default MemberItem;
