import styled from 'styled-components';
import { theme } from '../../../constants';

export const StoryContainer = styled.div`
  &&& {
    width: 100px;
    height: 100%;
    width: 150px;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
`;

export const Container = styled.div`
  background-color: ${theme.colors.mainWhite};
  text-align: end;
  &&& {
    .styledAvatar {
      border-radius: 6px !important;
    }
  }
`;

export const ItemWrapper = styled.div`
  &&& {
    display: flex;
    flex-direction: column;
    span {
      font-weight: 300;
      color: ${theme.colors.mainBlack};
      font-size: 15px;
      margin-top: 20px;
      cursor: pointer;

      &.selected {
        font-weight: bold;
        color: #f55819;
      }
    }
  }
`;
