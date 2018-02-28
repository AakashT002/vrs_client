import createReducer from '../../createReducer';
import * as ActionTypes from '../../actionTypes';

const initialState = {
  verificationResult: [],
  verificationList: [],
  requesting: false,
};

export const verification = createReducer(initialState, {
  [ActionTypes.VERIFY_PI_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VERIFY_PI_SUCCESS](state = initialState, action) {
    return Object.assign({}, state, {
      verificationResult: action.response.result,
      requesting: false,
    });
  },
  [ActionTypes.VERIFY_PI_FAILURE](state) {
    return { ...state, requesting: false };
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
});

export default verification;
