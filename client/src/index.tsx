import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import reportWebVitals from './reportWebVitals';
import RootNavigator from './navigators/root/RootNavigator';

import { CampfireHooksContext } from './hooks/campfire';
import { UserHooksContext } from './hooks/user';
import * as combinedCampfireHooks from './hooks/campfire/combined';
import * as combinedUserHooks from './hooks/user/combined';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserHooksContext.Provider value={combinedUserHooks}>
        <CampfireHooksContext.Provider value={combinedCampfireHooks}>
          <RootNavigator />
        </CampfireHooksContext.Provider>
      </UserHooksContext.Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
