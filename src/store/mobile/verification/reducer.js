import createReducer from '../../createReducer';
import * as ActionTypes from '../../actionTypes';

const initialState = {
  verificationResult: [],
  verificationList: [],
  requesting: false,
  isDescending: true,
  piRequesting: false,
  isScannerSelection: true,
};

export const verification = createReducer(initialState, {
  [ActionTypes.VERIFY_PI_REQUEST](state) {
    return { ...state, piRequesting: true };
  },
  [ActionTypes.VERIFY_PI_SUCCESS](state = initialState, action) {
    return Object.assign({}, state, {
      verificationResult: action.response.result,
      piRequesting: false,
    });
  },
  [ActionTypes.VERIFY_PI_FAILURE](state) {
    return { ...state, piRequesting: false };
  },
  [ActionTypes.CLEAR_VERIFICATION_RESULT](state = initialState) {
    return Object.assign({}, state, {
      verificationResult: [],
    });
  },
  [ActionTypes.FETCH_VERIFICATIONS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_VERIFICATIONS_SUCCESS](state = initialState, action) {
    return {
      ...state,
      verificationList: action.response.result,
      requesting: false,
    };
  },
  [ActionTypes.FETCH_VERIFICATIONS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.SORT_DATE_SUCCESS](state, action) {
    return {
      ...state,
      verificationList: action.verificationList,
      isDescending: action.isDescending,
    };
  },
  [ActionTypes.PRODUCT_DETAILS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.PRODUCT_DETAILS_SUCCESS](state = initialState, action) {
    return {
      ...state,
      verificationResult: action.response.result,
      requesting: false,
    };
  },
  [ActionTypes.PRODUCT_DETAILS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.RESET_SELECT_SCANNER](state = initialState) {
    return { ...state, isScannerSelection: false };
  },
});

export default verification;
