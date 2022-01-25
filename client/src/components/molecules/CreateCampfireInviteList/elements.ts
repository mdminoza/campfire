import styled from 'styled-components';

export const StoryContainer = styled.div`
  &&& {
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 20px;
  }
`;

export const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 310px;
  overflow: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &&& {
    .styledAvatar {
      border-radius: 4px !important;
    }
    .selected-user {
      background-color: #f4f4f4;
    }
  }
  &::-webkit-scrollbar {
    display: none;
`;

export const InviteUserItemContainer = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  padding: 6px 10px;
  border-radius: 4px;
  margin: 5px 0;
  cursor: pointer;
  .name-label {
    margin-left: 20px;
    font-size: 18px;
  }
  .name-label-selected {
    margin-left: 20px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
