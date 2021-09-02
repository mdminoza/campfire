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

  return {
    fetchCampfires,
    fetchOwnedCampfires,
    fetchPublicCampfires,
    fetchPrivateCampfires,
    addCampfire,
  };
};
