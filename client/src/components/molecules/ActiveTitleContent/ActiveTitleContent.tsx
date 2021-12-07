import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid } from 'antd';
import moment from 'moment';

import { theme } from '../../../constants';

const { useBreakpoint } = Grid;

const Container = styled.div`
  &&& {
    margin-top: 60px;
    @media (max-width: 576px) {
      margin-top: 0;
    }
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    position: relative;
    background-color: ${theme.colors.mainWhite};
  }
`;

export const Title = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: ${(props: { fontSize?: string }) => props?.fontSize || '1.9rem'};
    letter-spacing: 1px;
    color: ${theme.colors.mainBlack};
    z-index: 1;
    text-align: center;
    margin-top: 40px;
    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-top: 30px;
    }
    @media (max-width: 576px) {
      font-size: 1.2rem;
    }
    line-height: ${(props: {
      fontSize?: string;
      onActive?: boolean;
      lineHeight?: string;
    }) => props?.lineHeight || '35px'};
    padding: ${(props: {
      lineHeight?: string;
      onActive?: boolean;
      fontSize?: string;
      padding?: string | number;
    }) => props?.padding || 0};
  }
`;

export const Description = styled.p`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-size: ${(props: { width?: string; fontSize?: string }) =>
      props?.fontSize || '1.2rem'};
    letter-spacing: 0.15em;
    color: ${theme.colors.mainBlack};
    text-align: center;
    width: ${(props: {
      width?: string;
      fontSize?: string;
      onActive?: boolean;
    }) => props?.width || '60%'};
    z-index: 1;
    padding: ${(props: {
      width?: string;
      fontSize?: string;
      padding?: string | number;
      onActive?: boolean;
    }) => props?.padding || 0};
  }
`;

const StartedTime = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-weight: bold;
    font-style: normal;
    font-size: ${(props: { width?: string; fontSize?: string }) =>
      props?.fontSize || '0.7rem'};
    letter-spacing: 1.5px;
    color: #cdcdcd;
    text-align: center;
    z-index: 2;
  }
`;

type Props = {
  title: string;
  description: string;
  scheduleToStart: Date | undefined;
};

const ActiveTitleContent = ({
  title,
  description,
  scheduleToStart,
}: Props): React.ReactElement => {
  const screens = useBreakpoint();
  const { md } = screens;
  const [elapseTime, setElapseTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (scheduleToStart) {
        setElapseTime(
          `STARTED: ${moment(
            moment(scheduleToStart).format('YYYYMMDD HH:mm:ss'),
            'YYYYMMDD HH:mm:ss',
          )
            .fromNow()
            .toString()
            .toUpperCase()}`,
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [scheduleToStart]);

  return (
    <Container>
      <Title padding="0 10px" lineHeight={!md ? '25px' : ''}>
        {title}
      </Title>
      <Description
        padding="0 10px"
        width={!md ? 'auto' : ''}
        fontSize={!md ? '0.8rem' : ''}>
        {description}
      </Description>
      <StartedTime fontSize={!md ? '0.6rem' : ''}>{elapseTime}</StartedTime>
    </Container>
  );
};

export default ActiveTitleContent;
