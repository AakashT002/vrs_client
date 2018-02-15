import * as ActionTypes from '../actionTypes';
import Verifications from '../../services/Verifications';

export const getVerificationList = () => ({
  types: [
    ActionTypes.FETCH_VERIFICATIONS_REQUEST,
    ActionTypes.FETCH_VERIFICATIONS_SUCCESS,
    ActionTypes.FETCH_VERIFICATIONS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Verifications.getVerificationList();
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
