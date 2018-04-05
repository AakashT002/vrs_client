import * as ActionTypes from '../../actionTypes';
import Verification from '../../../services/mobile/Verification';
import {
  RETURNED_BY,
  SHIPPED_BY
} from '../../../utils/constants';

export const verifyProductIdentifier = (pi, deviceType, deviceId) => ({
  types: [
    ActionTypes.VERIFY_PI_REQUEST,
    ActionTypes.VERIFY_PI_SUCCESS,
    ActionTypes.VERIFY_PI_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Verification.verify(pi, deviceType, deviceId);
    } catch (error) {
      throw new Error(error);
    }
  },
});

export const clearVerificationResult = () => ({
  type: ActionTypes.CLEAR_VERIFICATION_RESULT,
});

export function sort(verificationList, isDescending) {
  if (isDescending) {
    verificationList.sort(function (a, b) {
      return new Date(b.requestSentTime) - new Date(a.requestSentTime);
    });
  } else {
    verificationList.sort(function (a, b) {
      return new Date(a.requestSentTime) - new Date(b.requestSentTime);
    });
  }
  return {
    type: ActionTypes.SORT_DATE_SUCCESS,
    verificationList,
    isDescending,
  };
}

export const getVerificationDetails = (gtin, srn) => ({
  types: [
    ActionTypes.PRODUCT_DETAILS_REQUEST,
    ActionTypes.PRODUCT_DETAILS_SUCCESS,
    ActionTypes.PRODUCT_DETAILS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Verification.getVerificationDetails(gtin, srn);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const updateDeviceType = () => ({
  type: ActionTypes.UPDATE_DEVICE_TYPE,
});

export function search(verificationList, searchField) {
  let newList = verificationList.filter(verification => {
    var found = verification.gtin.includes(searchField) ||
      verification.srn.includes(searchField) ||
      (verification.gtin + verification.srn).includes(searchField) ||
      verification.firstName.includes(searchField) ||
      verification.lastName.includes(searchField) ||
      (verification.firstName + verification.lastName).includes(searchField) ||
      verification.shippedBy.includes(searchField) ||
      verification.returnedBy.includes(searchField);
    return found;
  });
  return {
    type: ActionTypes.SEARCH_FIELD_SUCCESS,
    newList,
  };
}

export const clearSearchField = verificationList => ({
  type: ActionTypes.CLEAR_SEARCH_SUCCESS,
  verificationList,
});

export const getVerifications = (status, requestedTime) => ({
  types: [
    ActionTypes.FETCH_VERIFICATIONS_REQUEST,
    ActionTypes.FETCH_VERIFICATIONS_SUCCESS,
    ActionTypes.FETCH_VERIFICATIONS_FAILURE,
  ],
  callAPI: async () => {
    try {
      const verificationResult = await Verification.getVerifications(status,requestedTime);
      verificationResult.result.forEach(element => {
        element['returnedBy'] = RETURNED_BY[(Math.random() * RETURNED_BY.length) | 0];
        element['shippedBy'] = SHIPPED_BY[(Math.random() * SHIPPED_BY.length) | 0];
        return element;
      });
      return verificationResult;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});