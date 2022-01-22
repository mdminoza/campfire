import { useCallback } from 'react';
import axios from 'axios';
import axiosInstance from '../../../config/axios';
import { UserHooks } from '../index';
// import axios from '../../../config/axios';
import urls from '../../../constants/urls';
import { UserInterface } from './types';
// import { TodoParams } from '../../../../common/domain/entities/todo';

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

  const fetchCurrentUser = useCallback(async (token: string) => {
    try {
      const userUrl = urls.web.dev + urls.user.current;
      const res = await axios.get(userUrl, {
        headers: { Authorization: `Bearer ${token}` },
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

  const fetchAllUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('access-token');
      // eslint-disable-next-line prefer-const
      let users: string | any[] | PromiseLike<any[]> = [];
      let page = 1;
      while (true) {
        const userUrl = `${urls.web.dev}users?page=${page}&per_page=10&order=asc&orderby=id`;
        // eslint-disable-next-line no-await-in-loop
        const res = await axios.get(userUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // eslint-disable-next-line no-extra-boolean-cast
        if (res.data.data.length < 10) {
          break;
        } else {
          users = [...users, ...res.data.data];
          page += 1;
        }
      }
      return users as any[];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchAllFriends = useCallback(async () => {
    try {
      const token = localStorage.getItem('access-token');
      // eslint-disable-next-line prefer-const
      let users: string | any[] | PromiseLike<any[]> = [];
      let page = 1;
      while (true) {
        const userUrl = `${urls.web.buddyBossDev}members?scope=personal&page=${page}&per_page=10`;
        // eslint-disable-next-line no-await-in-loop
        const res = await axios.get(userUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // eslint-disable-next-line no-extra-boolean-cast
        if (res.data.length < 10) {
          users = [...users, ...res.data];
          break;
        } else {
          users = [...users, ...res.data];
          page += 1;
        }
      }
      return users as any[];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  return {
    loginUser,
    fetchCurrentUser,
    fetchRandomTestUser,
    fetchAllUsers,
    fetchAllFriends,
  };
};
