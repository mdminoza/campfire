/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState } from 'react';
import {
  UpOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Calendar } from 'antd';
import moment, { Moment } from 'moment';
import {
  Container,
  TimePickerWrapper,
  DatePickerWrapper,
  ScheduleButton,
  TimePickerDiv,
  TimePickerBtnContainer,
  CalendarHeaderContainer,
  TodayButton,
  CalendarHeaderBtnWrapper,
  CalendarHeaderButton,
  TimePickerBtnWrapper,
  UpArrowBtn,
  DownArrowBtn,
  TimeLabel,
} from './elements';

type Props = {
  onClickSchedule: () => void;
  hasSchedule: boolean;
  activeHour: number;
  activeMinute: number;
  activePeriod: string;
  onClickHour: (val: number) => void;
  onClickMinute: (val: number) => void;
  onClickPeriod: (val: 'am' | 'pm') => void;
  onSelectDate: (val: Moment) => void;
};

type TimePickerProps = {
  max: number;
  min: number;
  disabled: boolean;
  onClickActive: (value: number) => void;
  active: number;
  hasZero?: boolean;
};

const TimePicker = ({
  max,
  min,
  disabled,
  onClickActive,
  active,
  hasZero,
}: TimePickerProps) => {
  const onClickUp = () => {
    if (active > min) {
      onClickActive(active - 1);
    }
  };
  const onClickDown = () => {
    if (active < max) {
      onClickActive(active + 1);
    }
  };

  const transformMinute = () => {
    let activeStr = `${active}`;
    if (active === 0) {
      activeStr = '00';
    }
    if (hasZero && active > 0 && active < 10) {
      activeStr = `0${active}`;
    }
    return activeStr;
  };

  return (
    <TimePickerBtnWrapper>
      <UpArrowBtn disabled={disabled} onClick={onClickUp}>
        <UpOutlined
          style={{
            fontSize: 20,
            color: '#b6b6b6',
          }}
        />
      </UpArrowBtn>
      <TimeLabel className={disabled ? 'disabled-label' : ''}>
        {transformMinute()}
      </TimeLabel>
      <DownArrowBtn disabled={disabled} onClick={onClickDown}>
        <DownOutlined
          style={{
            fontSize: 20,
            color: '#b6b6b6',
          }}
        />
      </DownArrowBtn>
    </TimePickerBtnWrapper>
  );
};

const AmPmPicker = ({
  disabled,
  onClickActive,
  active,
}: {
  disabled: boolean;
  onClickActive: (value: 'am' | 'pm') => void;
  active: string;
}) => {
  const onClickUp = () => {
    onClickActive('am');
  };
  const onClickDown = () => {
    onClickActive('pm');
  };

  return (
    <TimePickerBtnWrapper>
      <UpArrowBtn disabled={disabled} onClick={onClickUp}>
        <UpOutlined
          style={{
            fontSize: 20,
            color: '#b6b6b6',
          }}
        />
      </UpArrowBtn>
      <TimeLabel className={disabled ? 'disabled-label' : ''}>
        {active}
      </TimeLabel>
      <DownArrowBtn disabled={disabled} onClick={onClickDown}>
        <DownOutlined
          style={{
            fontSize: 20,
            color: '#b6b6b6',
          }}
        />
      </DownArrowBtn>
    </TimePickerBtnWrapper>
  );
};

const CreateCampfireSchedule = ({
  activeHour,
  activeMinute,
  activePeriod,
  onClickHour,
  onClickMinute,
  onClickPeriod,
  onSelectDate,
  onClickSchedule,
  hasSchedule,
}: Props): React.ReactElement => (
  <Container>
    <TimePickerWrapper>
      <ScheduleButton
        className={hasSchedule ? 'hasSchedule' : ''}
        onClick={onClickSchedule}>
        SCHEDULE: {hasSchedule ? 'ON' : 'OFF'}
      </ScheduleButton>
      <TimePickerDiv>
        <span
          className={`timepicker-label ${hasSchedule ? '' : 'disabled-label'}`}>
          Choose Your Time
        </span>
        <TimePickerBtnContainer>
          <TimePicker
            onClickActive={onClickHour}
            active={activeHour}
            disabled={!hasSchedule}
            max={12}
            min={1}
          />
          <TimePicker
            onClickActive={onClickMinute}
            active={activeMinute}
            disabled={!hasSchedule}
            max={59}
            min={0}
            hasZero
          />
          <AmPmPicker
            active={activePeriod}
            onClickActive={onClickPeriod}
            disabled={!hasSchedule}
          />
        </TimePickerBtnContainer>
      </TimePickerDiv>
    </TimePickerWrapper>
    <DatePickerWrapper>
      <Calendar
        className={hasSchedule ? 'main-calendar' : 'disabled-main-calendar'}
        onSelect={onSelectDate}
        headerRender={({ value, onChange }) => {
          const localeData = value.localeData();
          const months = localeData.months();

          const month = value.month();
          const year = value.year();
          const currentMonth = months[month];

          const onClickToday = () => {
            onChange(moment());
          };

          const onClickLeft = () => {
            const newValue = value.clone();
            newValue.subtract(1, 'months');
            onChange(newValue);
          };
          const onClickRight = () => {
            const newValue = value.clone();
            newValue.add(1, 'months');
            onChange(newValue);
          };

          return (
            <CalendarHeaderContainer>
              <TodayButton
                className={hasSchedule ? '' : 'disabled-label'}
                disabled={!hasSchedule}
                onClick={onClickToday}>
                TODAY
              </TodayButton>
              <CalendarHeaderBtnWrapper>
                <CalendarHeaderButton
                  disabled={!hasSchedule}
                  onClick={onClickLeft}
                  style={{
                    color: hasSchedule ? '#b6b6b6' : '#e9e9e9',
                  }}>
                  <LeftOutlined />
                </CalendarHeaderButton>
                <span
                  className={
                    hasSchedule ? 'header-month' : 'disabled-header-month'
                  }>{`${currentMonth} ${year}`}</span>
                <CalendarHeaderButton
                  disabled={!hasSchedule}
                  onClick={onClickRight}
                  style={{
                    color: hasSchedule ? '#b6b6b6' : '#e9e9e9',
                  }}>
                  <RightOutlined />
                </CalendarHeaderButton>
              </CalendarHeaderBtnWrapper>
            </CalendarHeaderContainer>
          );
        }}
        fullscreen={false}
        disabledDate={() => !hasSchedule}
      />
    </DatePickerWrapper>
  </Container>
);

export default CreateCampfireSchedule;
