import { useCallback } from 'react';
import { TurnHooks } from '../index';
import axios from '../../../config/axios';
import urls from '../../../constants/urls';

export const useTurnAction: TurnHooks['useTurnAction'] = () => {
  const getTurnCredentials = useCallback(async () => {
    try {
      const res = await axios.get(urls.turn);
      if (res && res?.status === 200) {
        return res.data;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return {
    getTurnCredentials,
  };
};
