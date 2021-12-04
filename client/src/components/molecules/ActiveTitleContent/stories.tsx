import React from 'react';
import { storiesOf } from '@storybook/react';

import ActiveTitleContent from './ActiveTitleContent';

storiesOf('molecule/ActiveTitleContent', module).add('default', () => (
  <ActiveTitleContent
    title="MONEY IN THE BIBLE"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies vulputate vestibulum, sed tempus. Justo "
    scheduleToStart={new Date('Dec 04 2021 15:35:00')}
  />
));
