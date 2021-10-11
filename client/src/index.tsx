import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import reportWebVitals from './reportWebVitals';
import RootNavigator from './navigators/root/RootNavigator';

import { CampfireHooksContext } from './hooks/campfire';
import { MemberHooksContext } from './hooks/member';
import { TurnHooksContext } from './hooks/turn';
import SocketProvider from './hooks/socket/provider';
import MediaStreamProvider from './hooks/mediaStream/provider';
import UserProvider from './hooks/user/provider';
import * as combinedCampfireHooks from './hooks/campfire/combined';
import * as combinedMemberHooks from './hooks/member/combined';
import * as combinedTurnHooks from './hooks/turn/combined';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TurnHooksContext.Provider value={combinedTurnHooks}>
          <MediaStreamProvider>
            <SocketProvider>
              <CampfireHooksContext.Provider value={combinedCampfireHooks}>
                <MemberHooksContext.Provider value={combinedMemberHooks}>
                  <RootNavigator />
                </MemberHooksContext.Provider>
              </CampfireHooksContext.Provider>
            </SocketProvider>
          </MediaStreamProvider>
        </TurnHooksContext.Provider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
