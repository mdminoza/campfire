import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Moment } from 'moment';
import CreateCampfireSchedule from './CreateCampfireSchedule';
import { StoryContainer } from './elements';

storiesOf('molecule/CreateCampfireSchedule', module).add('default', () => {
  const [hasSchedule, setHasSchedule] = useState(false);
  const [activeHour, setActiveHour] = useState(1);
  const [activeMinute, setActiveMinute] = useState(1);
  const [activePeriod, setActivePeriod] = useState('am');

  const onSelectDate = (val: Moment) => {
    console.log(val, 'selected date');
  };

  const onClickSchedule = () => {
    setHasSchedule(!hasSchedule);
  };

  return (
    <StoryContainer>
      <CreateCampfireSchedule
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
