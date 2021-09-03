import { useCallback } from 'react';
import { CampfireHooks } from '../index';
import axios from '../../../config/axios';
import urls from '../../../constants/urls';
import { CampfireParams } from '../../../../common/domain/entities/campfire';
// import { TodoParams } from '../../../../common/domain/entities/todo';

export const useCampfireAction: CampfireHooks['useCampfireAction'] = () => {
  const fetchCampfires = useCallback(async () => {
    try {
      const res = await axios.get(`${urls.campfire.main}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchOwnedCampfires = useCallback(async (cid: string) => {
    try {
      const res = await axios.get(`${urls.campfire.owned}?cid=${cid}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchPublicCampfires = useCallback(async (cid: string) => {
    try {
      const res = await axios.get(`${urls.campfire.public}?cid=${cid}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const fetchPrivateCampfires = useCallback(async (cid: string) => {
    try {
      const res = await axios.get(`${urls.campfire.private}?cid=${cid}`);
      if (res && res?.status === 200) {
        return res.data;
      }
      return [];
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const addCampfire = useCallback(async (campfire: CampfireParams) => {
    try {
      const res = await axios.post(`${urls.campfire.main}`, campfire);
      if (res && res?.status === 201) {
        return res.data;
      }
      return null;
    } catch (e: any) {
      throw new Error(e);
    }
  }, []);

  const searchCampfires = useCallback(
    async (cid: string, tpc: string, type: 'public' | 'private' | 'owned') => {
      try {
        const url =
          // eslint-disable-next-line no-nested-ternary
          type === 'owned'
            ? `${urls.campfire.owned}`
            : type === 'private'
              ? `${urls.campfire.private}`
              : `${urls.campfire.public}`;

        const res = await axios.get(`${url}?cid=${cid}&tpc=${tpc}`);
        if (res && res?.status === 200) {
          return res.data;
        }
        return null;
      } catch (e: any) {
        throw new Error(e);
      }
    },
    [],
  );

  return {
    fetchCampfires,
    fetchOwnedCampfires,
    fetchPublicCampfires,
    fetchPrivateCampfires,
    addCampfire,
    searchCampfires,
  };
};
