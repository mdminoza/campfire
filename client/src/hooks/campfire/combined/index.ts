import { useCallback } from 'react';
import { CampfireHooks } from '../index';
import axios from '../../../config/axios';
import urls from '../../../constants/urls';
// import { TodoParams } from '../../../../common/domain/entities/todo';

export const useCampfireAction: CampfireHooks['useCampfireAction'] = () => {
  const fetchCampfires = useCallback(async () => {
    try {
      const res = await axios.get(`${urls.campfire}`);
      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  }, []);

  return {
    fetchCampfires,
  };
};
