import styled from 'styled-components';
import { theme } from '../../../constants';

export const StoryContainer = styled.div`
  &&& {
    height: 50vh;
    width: 100%;
    background: ${theme.colors.gray};
    padding: 40px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${theme.colors.orange1};
  border-radius: 0 0px 4px 4px;
`;

export const ButtonWrapper = styled.div`
  &&& {
    .invitation-label {
      font-size: 18px;
      color: ${theme.colors.mainWhite};
      font-weight: 300;
      padding: 0 20px;
    }
  }
`;

export const LabelWrapper = styled.div`
  &&& {
    display: flex;
    align-items: center;
    span {
      font-size: 18px;
      color: ${theme.colors.mainWhite};

      &.start-label {
        font-weight: bold;
        padding: 0px 10px 0 20px;
      }
      &.schedule-label {
        font-weight: 300;
      }
    }
  }
`;

export const GoButton = styled.button`
  background-color: #ac3e12;
  color: ${theme.colors.mainWhite};
  border: none;
  border-radius: 0 0 4px 0 !important;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 12px;
  cursor: pointer;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  padding: 10px 10px;
`;
