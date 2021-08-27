import { useCallback } from 'react';
import axios from 'axios';
import { UserHooks } from '../index';
// import axios from '../../../config/axios';
import urls from '../../../constants/urls';
// import { TodoParams } from '../../../../common/domain/entities/todo';

const userUrl = urls.native.dev + urls.user.current;
const tempToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjg0LCJuYW1lIjoiZGVlYiIsImlhdCI6MTYyOTM4Mjg2MCwiZXhwIjoxNzg3MDYyODYwfQ.5D6O9jfIypC3CotSCGYY2nr31-lhjgu83EdVJNo4YWk';

export const useUserAction: UserHooks['useUserAction'] = () => {
  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await axios.get(userUrl, {
        headers: { Authorization: `Bearer ${tempToken}` },
      });
      return res.data;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return {
    fetchCurrentUser,
  };
};
