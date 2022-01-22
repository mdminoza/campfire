import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../atoms/Avatar';
import { JoinClose } from '../../atoms/Icons';

type Props = {
  title: string;
  description: string;
  isStarted?: boolean;
  hasInvites?: boolean;
  onClose?: () => void;
  profile?: string;
  onClickJoin?: () => void;
};

// const Container = styled.div<{ onActive: boolean }>`
const Container = styled.div`
  &&& {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #f55819;
    position: relative;
    padding: 10px;
    border-radius: 4px;
  }
`;

const Wrapper = styled.div`
  &&& {
    @media (min-width: 1200px) {
      padding: 30px 120px 15px 120px;
    }
    @media (min-width: 1300px) {
      padding: 30px 190px 15px 190px;
    }
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`;

const Title = styled.p`
  &&& {
    font-size: 43px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0;
    line-height: 45px;
    color: #fff;
    letter-spacing: 2px;
  }
`;

const Description = styled.p<{ onStarted?: boolean }>`
  &&& {
    font-size: 20px;
    font-weight: ${(props) => (props.onStarted ? '600' : '200')};
    text-align: center;
    margin-bottom: 0;
    color: #fff;
  }
`;

const CustomBtn = styled.div`
  &&& {
    background: #ac3e11;
    width: 100%;
    border-radius: 5px;
    padding: 8px;
    margin-top: 30px;
    cursor: pointer;
  }
`;

const AvatarWrapper = styled.div`
  &&& {
    .styledAvatar {
      border-radius: 10px !important;
    }
  }
  margin-bottom: 10px;
`;

const BtnText = styled.div`
  &&& {
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 0;
    color: #fff;
    letter-spacing: 1px;
  }
`;

const CloseBtn = styled.button`
  color: white;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 26px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  height: 37px;
  padding: 0;
`;

const JoinCampfire = ({
  title,
  description,
  isStarted,
  hasInvites = false,
  onClose = () => {},
  onClickJoin = () => {},
  profile = 'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
}: Props): React.ReactElement => (
  <Container>
    <Wrapper>
      {!isStarted && (
        <CloseBtn onClick={onClose}>
          <JoinClose />
        </CloseBtn>
      )}

      <AvatarWrapper>
        <Avatar size={82} src={profile} />
      </AvatarWrapper>
      <Title>{title.toUpperCase()}</Title>
      <Description>{description.toUpperCase()}</Description>
    </Wrapper>
    <Wrapper>
      <Description onStarted>
        {isStarted ? 'CAMPFIRE HAS STARTED' : 'CAMPFIRE HAS BEEN SCHEDULED'}
      </Description>
      <Description>{hasInvites ? 'INVITES HAVE BEEN SENT' : ''}</Description>
    </Wrapper>
    {isStarted && (
      <CustomBtn onClick={onClickJoin}>
        <BtnText>JOIN YOUR CAMPFIRE</BtnText>
      </CustomBtn>
    )}
  </Container>
);

export default JoinCampfire;
