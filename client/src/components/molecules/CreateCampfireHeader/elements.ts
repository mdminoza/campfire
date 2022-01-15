import styled from 'styled-components';
import { Row, Col, Divider } from 'antd';
import { theme } from '../../../constants';

export const InfoTitle = styled.span`
  &&& {
    font-family: ${theme.fonts.fontBoldFamily}
    font-size: 12px;
    font-weight: 700;
    color: ${theme.colors.mainBlack};
    .hidden-type {
      color: #c4c4c4;
    }
  }
`;

export const InfoTitleType = styled.span`
  &&& {
    color: #f55819;
  }
`;

export const InfoSubtitle = styled.span`
  &&& {
    font-family: ${theme.fonts.fontFamily};
    font-size: 0.8rem;
    font-weight: 100;
    font-style: italic;
    color: ${theme.colors.mainBlack};
  }
`;

export const CheckboxContainer = styled.div`
  &&& {
    padding-top: 9px;
    width: 48px;
  }
`;

export const CheckboxLabelWrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
  }
`;

export const CheckBoxWrapper = styled.div`
  &&& {
    display: -webkit-box;
  }
`;

export const StoryContainer = styled.div`
  &&& {
    height: 50vh;
    width: 100%;
    background: ${theme.colors.gray};
    padding: 40px;
  }
`;

export const TopicWrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    .topic-label {
      font-size: 21px;
      line-height: 20px;
      font-weight: 700;
      color: ${theme.colors.mainBlack};
    }
    .description-label {
      font-weight: 400;
      color: ${theme.colors.mainBlack};
    }
  }
`;

export const CampfireHeaderRow = styled(Row)`
  &&& {
    .campfire-header-2 {
      text-align: end;
    }
  }
`;
