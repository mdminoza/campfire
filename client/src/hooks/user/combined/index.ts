import { useCallback } from 'react';
import axios from 'axios';
import axiosInstance from '../../../config/axios';
import { UserHooks } from '../index';
// import axios from '../../../config/axios';
import urls from '../../../constants/urls';
// import { TodoParams } from '../../../../common/domain/entities/todo';

const userUrl = urls.native.dev + urls.user.current;
const tempToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZy5nb2R0cmliZS5jb20iLCJpYXQiOjE2MzAzMTcwNTQsIm5iZiI6MTYzMDMxNzA1NCwiZXhwIjoxNjMwOTIxODU0LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI4MiJ9fX0.nv51JGoz6VT3BSXX1XcyT7NiQhdEaGxPl8kZIo3krqY';

export const useUserAction: UserHooks['useUserAction'] = () => {
  const loginUser = useCallback(async (username: string, password: string) => {
    try {
      const res = await axios.post(urls.web.jwt, {
        username,
        password,
      });
      return res.data.token;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

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

  const fetchRandomTestUser = useCallback(async () => {
    try {
      const res = await axiosInstance.get(urls.user.randomTestUser);
      return res.data;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return {
    loginUser,
    fetchCurrentUser,
    fetchRandomTestUser,
  };
};
