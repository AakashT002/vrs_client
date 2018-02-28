import * as ActionTypes from '../../actionTypes';
import Verification from '../../../services/mobile/Verification';

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
      throw new Error(error);
    }
  },
});

export const clearVerificationResult = () => ({
  type: ActionTypes.CLEAR_VERIFICATION_RESULT,
});

export const getVerificationList = () => ({
  types: [
    ActionTypes.FETCH_VERIFICATIONS_REQUEST,
    ActionTypes.FETCH_VERIFICATIONS_SUCCESS,
    ActionTypes.FETCH_VERIFICATIONS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Verification.getVerificationList();
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const getProductDetails = (gtin, srn) => ({
  types: [
    ActionTypes.PRODUCT_DETAILS_REQUEST,
    ActionTypes.PRODUCT_DETAILS_SUCCESS,
    ActionTypes.PRODUCT_DETAILS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Verification.getProductDetails(gtin, srn);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
