import * as ActionTypes from '../actionTypes';
import Verification from '../../services/Verification';

export const verifyProductIdentifier = pi => ({
  types: [
    ActionTypes.VERIFY_PI_REQUEST,
    ActionTypes.VERIFY_PI_SUCCESS,
    ActionTypes.VERIFY_PI_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Verification.verify(pi);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
