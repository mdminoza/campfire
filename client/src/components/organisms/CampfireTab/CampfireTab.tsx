import React from 'react';
import styled from 'styled-components';
import { Tabs, Grid } from 'antd';

import { theme } from '../../../constants';

const { TabPane } = Tabs;

type TabProps = {
  key: string;
  title: string;
  count: number;
  children: React.ReactNode;
};

type Props = {
  onChange: (key: string) => void;
  tabs: TabProps[];
  activeKey?: string;
};

const StyledTabs = styled(Tabs)`
  &&& {
    background-color: ${theme.colors.gray.light};
    .ant-tabs-tab-active {
      span {
        font-weight: bold;
      }
    }
  }
`;

const TabWrapper = styled.div`
  &&& {
    .ant-tabs-ink-bar {
      height: 1.2px !important;
      background: ${theme.colors.mainBlack} !important;
    }

    .ant-tabs-nav {
      &:before {
        border-bottom: 1.2px solid ${theme.colors.gray.grayb9};
      }
    }

    .ant-tabs-tab + .ant-tabs-tab {
      margin: 0 0 0 50px;
    }
  }
`;

const TabTitleWrapper = styled.div``;

const TabTitleLabel = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-style: normal;
    font-weight: normal;
    font-size: 1rem;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #484848;
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
    background-color: ${theme.colors.orange1};
    padding: 4px 10px;
    margin-left: 16px;
    border-radius: 6px;
  }
`;

const TabTitle = ({ title, count }: { title: string; count: number }) => (
  <TabTitleWrapper>
    <TabTitleLabel>{title}</TabTitleLabel>
    {count > 0 && <TabBadge>{count}</TabBadge>}
  </TabTitleWrapper>
);

const { useBreakpoint } = Grid;

const CampfireTab = ({
  onChange,
  tabs,
  activeKey,
}: Props): React.ReactElement => {
  const screens = useBreakpoint();
  const { xs, sm, md } = screens;
  return (
    <TabWrapper
      className={
        !md && (xs || sm) ? 'campfireTabs1 _campfireTabs' : 'campfireTabs1'
      }>
      <StyledTabs centered activeKey={activeKey} onChange={onChange}>
        {tabs.map((tab) => (
          <TabPane
            tab={<TabTitle title={tab.title} count={tab.count} />}
            key={tab.key}>
            {tab.children}
          </TabPane>
        ))}
      </StyledTabs>
    </TabWrapper>
  );
};

export default CampfireTab;
