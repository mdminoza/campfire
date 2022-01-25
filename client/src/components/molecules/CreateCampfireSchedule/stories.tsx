import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import moment, { Moment } from 'moment';
import CreateCampfireSchedule from './CreateCampfireSchedule';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampfireSchedule', module).add('default', () => {
  const [hasSchedule, setHasSchedule] = useState(false);
  const [activeHour, setActiveHour] = useState(1);
  const [activeMinute, setActiveMinute] = useState(1);
  const [activePeriod, setActivePeriod] = useState('am');
  const [value, setValue] = useState(moment());

  const onSelectDate = (val: Moment) => {
    console.log(val, 'selected date');
    setValue(val);
  };

  const onClickSchedule = () => {
    setHasSchedule(!hasSchedule);
  };

  return (
    <StoryContainer>
      <CreateCampfireSchedule
        valueDate={value}
        activeHour={activeHour}
        onClickHour={setActiveHour}
        activeMinute={activeMinute}
        onClickMinute={setActiveMinute}
        activePeriod={activePeriod}
        onClickPeriod={setActivePeriod}
        onSelectDate={onSelectDate}
        hasSchedule={hasSchedule}
        onClickSchedule={onClickSchedule}
      />
    </StoryContainer>
  );
});
