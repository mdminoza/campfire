import React from 'react';
import styled from 'styled-components';
import { Button, Result } from 'antd';

import { Campfire } from '../../../../common/domain/entities/campfire';
import { theme } from '../../../constants';

const Container = styled.div`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${theme.colors.mainWhite};
  }
`;

type Props = {
  data: Partial<Campfire> | undefined;
  onClickRejoin: () => void;
  onClickHome: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  streamError?: any;
};

const ActiveResult = ({
  data,
  onClickRejoin,
  onClickHome,
  error,
  streamError,
}: Props): React.ReactElement => {
  const currentDate = new Date();
  let isStarted = false;

  if (data && data.scheduleToStart) {
    isStarted = currentDate > new Date(data.scheduleToStart);
  }
  const renderButton = () => {
    if (error) {
      return (
        <Button type="primary" onClick={onClickHome}>
          Back to Home
        </Button>
      );
    }
    if (isStarted) {
      return [
        <Button key="home" type="primary" onClick={onClickHome}>
          Back to Home
        </Button>,
        <Button key="rejoin" type="primary" onClick={onClickRejoin}>
          Rejoin
        </Button>,
      ];
    }
    return (
      <Button type="primary" onClick={onClickHome}>
        Back to Home
      </Button>
    );
  };

  const isStartedMsg = isStarted
    ? 'You have left the campfire'
    : 'Sorry, campfire is not available at the moment.';

  const errorMessage = error
    ? 'Sorry, campfire is not available at the moment or does not exist.'
    : isStartedMsg;

  const errStreamMsg = streamError
    ? 'Please enable microphone access to join campfires.'
    : errorMessage;

  return (
    <Container>
      <Result
        status="404"
        title="Oopss!"
        subTitle={errStreamMsg}
        extra={renderButton()}
      />
    </Container>
  );
};

export default ActiveResult;
