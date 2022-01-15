import styled from 'styled-components';
import { theme } from '../../../constants';

export const StoryContainer = styled.div`
  &&& {
    width: 100%;
    height: 100%;
    padding: 20px;
  }
`;

export const Container = styled.div`
  background-color: ${theme.colors.mainWhite};
  display: flex;
  padding: 10px;
`;

export const TimePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .hasSchedule {
    color: white;
    background-color: ${theme.colors.orange1};
    box-shadow: none;
  }
`;

export const TimePickerDiv = styled.div`
  background-color: #f4f4f4;
  border-radius: 5px;
  margin-top: 24px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 30px;
  .timepicker-label {
    color: ${theme.colors.mainBlack};
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 1px;
  }
  .disabled-label {
    color: #ababab;
  }
`;

export const DatePickerWrapper = styled.div`
  padding: 0 20px;
  width: 400px;

  .ant-picker-calendar {
    .ant-picker-cell {
      padding: 0;
    }
    .ant-picker-panel {
      border-top: none;
    }
    .ant-picker-cell-in-view.ant-picker-cell-selected {
      .ant-picker-calendar-date-value {
        font-weight: 700;
        color: black;
        font-size: 14px;
      }
      .ant-picker-cell-inner {
        background: none;
      }
    }
    .ant-picker-calendar-date-today {
      &::before {
        border: none;
      }
    }
    .ant-picker-calendar-date-value {
      font-size: 12px;
    }
  }
  .main-calendar {
    .ant-picker-content {
      & {
        height: 198px;
        thead {
          tr {
            th {
              font-weight: bold;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
  .disabled-main-calendar {
    .ant-picker-cell-in-view.ant-picker-cell-selected {
      .ant-picker-calendar-date-value {
        color: #ababab;
        font-size: 14px;
      }
    }
    .ant-picker-content {
      & {
        height: 198px;
        thead {
          tr {
            th {
              font-weight: bold;
              color: #ababab;
            }
          }
        }
      }
    }
    .ant-picker-cell-disabled {
      &::before {
        background: none;
      }
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
      font-size: 16px;
      margin-top: 20px;
      cursor: pointer;

      &.selected {
        font-weight: bold;
        color: #f55819;
      }
    }
  }
`;

export const ScheduleButton = styled.button`
  border: none;
  color: #0d0d0d;
  font-weight: 700;
  font-size: 14px;
  background-color: ${theme.colors.mainWhite};
  padding: 15px 40px;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  cursor: pointer;
  &:active {
    background-color: #f9d4c6;
  }
`;

export const CalendarHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 0;
  padding: 0 16px;
  .disabled-label {
    color: #ababab;
  }
`;

export const TodayButton = styled.button`
  background-color: #ededed;
  font-size: 12px;
  font-weight: 700;
  color: ${theme.colors.mainBlack};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 24px;
  &:active {
    background-color: #dddddd;
  }
`;

export const CalendarHeaderBtnWrapper = styled.div`
  .header-month {
    font-size: 17px;
    font-weight: 700;
    color: ${theme.colors.mainBlack};
    padding: 0 5px;
  }
  .disabled-header-month {
    font-size: 17px;
    font-weight: 700;
    color: #ababab;
    padding: 0 5px;
  }
`;

export const CalendarHeaderButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:active {
    background-color: #ebebeb;
  }
`;

export const UpArrowBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:active {
    background-color: #ebebeb;
  }
`;
export const DownArrowBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:active {
    background-color: #ebebeb;
  }
`;

export const TimePickerBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .disabled-label {
    color: #ababab;
  }
`;

export const TimePickerBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const TimeLabel = styled.span`
  color: black;
  font-weight: 700;
  font-size: 16px;
  padding: 6px 0 9px;
`;