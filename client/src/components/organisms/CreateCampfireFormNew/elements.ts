import styled from 'styled-components';
import { Row, Col, Divider } from 'antd';
import { theme } from '../../../constants';

export const StoryContainer = styled.div`
  &&& {
    height: 100vh;
    width: 100%;
    background: ${theme.colors.blue.primary};
    padding: 40px 50px;
  }
`;
