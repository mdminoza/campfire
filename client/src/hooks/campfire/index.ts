import React from 'react';
import { useClient } from '../client';

export type CampfireHooks = {
  useCampfireAction(): {
    fetchCampfires: () => Promise<[] | undefined>;
  };
};

export const CampfireHooksContext = React.createContext<CampfireHooks | null>(
  null,
);

export const useCampfireAction: CampfireHooks['useCampfireAction'] = () => {
  const client = useClient(CampfireHooksContext);
  return client.useCampfireAction();
};
