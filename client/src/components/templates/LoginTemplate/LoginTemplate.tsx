import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { theme } from '../../../constants';
import { FireOutline } from '../../atoms/Icons';
import { TextInput } from '../../atoms/TextInput';
import { Button } from '../../atoms/Button';
import { Title, Description } from '../../molecules/TitleContent/TitleContent';

const Container = styled.div`
  background: ${theme.colors.gray.gray2C};
  height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 350px;
  margin: auto;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const InputTitle = styled.text`
  color: ${theme.colors.mainWhite};
  font-weight: 700;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  margin-top: 55px;
  display: flex;
  justify-content: center;
`;

const LoginButtonStyle = {
  background: theme.colors.orange,
  width: 150,
  color: theme.colors.mainWhite,
  fontSize: 16,
  fontWeight: 700,
};

const LoginTemplate = (): React.ReactElement => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <Wrapper>
        <TitleContainer>
          <FireOutline width={75} height={106} />
          <Title>CAMPFIRES</Title>
          <Description width="100%" fontSize="0.9rem">
            AUDIO ONLY MEETING ROOMS
          </Description>
        </TitleContainer>
        <InputWrapper>
          <InputTitle>Username</InputTitle>
          <TextInput onChange={(val) => setUsername(val)} value={username} />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>Password</InputTitle>
          <TextInput onChange={(val) => setPassword(val)} value={password} />
        </InputWrapper>
        <ButtonWrapper>
          <Button onClick={() => console.log('Login')} style={LoginButtonStyle}>
            Login
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

export default LoginTemplate;
