import React from 'react';
import styled from 'styled-components';

import { theme } from '../../../constants';

type TabProps = {
  key: string;
  title: string;
  count: number;
};

type Props = {
  tabs: TabProps[];
  activeKey?: string;
  onClickTab?: (key: string) => void;
};

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const TabTitleWrapper = styled.div`
  background-color: ${(props: { isActive?: boolean }) =>
    props.isActive ? '#000000' : 'transparent'};
  width: 100%;
  text-align: center;
  padding: 12px;
  border-bottom: ${(props: { isActive?: boolean; hasBorder?: boolean }) =>
    props.hasBorder ? '2px solid black' : 'none'};
`;

const TabTitleLabel = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: ${(props: { isActive?: boolean }) =>
      props.isActive ? 'bold' : 'normal'};
    font-size: 1rem;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: ${(props: { isActive?: boolean }) =>
      props.isActive ? theme.colors.mainWhite : theme.colors.mainBlack};
  }
`;

const TabBadge = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: bold;
    font-size: 0.8rem;
    line-height: 24px;
    color: ${theme.colors.mainWhite};
    background-color: ${theme.colors.red.light};
    padding: 4px 10px;
    margin-left: 8px;
  }
`;

const TabTitle = ({
  title,
  count,
  onClick,
  isActive,
  index,
}: {
  title: string;
  count: number;
  index: number;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <TabTitleWrapper
    hasBorder={index === 2}
    isActive={isActive}
    onClick={onClick}>
    <TabTitleLabel isActive={isActive}>{title}</TabTitleLabel>
    {count > 0 && <TabBadge>{count}</TabBadge>}
  </TabTitleWrapper>
);

const CampfireTabMobile = ({
  onClickTab = () => {},
  tabs,
  activeKey,
}: Props): React.ReactElement => (
  <TabWrapper>
    {tabs.map((tab, index) => (
      <TabTitle
        index={index}
        key={tab.key}
        isActive={activeKey === tab.key}
        onClick={() => onClickTab(tab.key)}
        title={tab.title}
        count={tab.count}
      />
    ))}
  </TabWrapper>
);

export default CampfireTabMobile;
