import { useCallback } from 'react';
import { UserHooks } from '../index';
import axios from '../../../config/axios';
import urls from '../../../constants/urls';
// import { TodoParams } from '../../../../common/domain/entities/todo';

export const useUserAction: UserHooks['useUserAction'] = () => {
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${urls.user.subscribed}`);
      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return {
    fetchUsers,
  };
};
