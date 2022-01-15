import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CreateCampfireForm from './CreateCampfireForm';
import UserProvider from '../../../hooks/user/provider';

const Component = () => {
  const [isToggled, setCampfireToggled] = useState<boolean>(false);
  const handleToggle = () => setCampfireToggled(!isToggled);
  return (
    <CreateCampfireForm
      toggle={isToggled}
      onPress={handleToggle}
      onSubmit={(values) => console.log(values)}
    />
  );
};

storiesOf('organism/CreateCampfireForm', module).add('default', () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Component />
      </UserProvider>
    </QueryClientProvider>
  );
});
