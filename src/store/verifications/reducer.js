import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialState = {
  verificationList: [],
  requesting: false,
};

export const verifications = createReducer(initialState, {
  [ActionTypes.FETCH_VERIFICATIONS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_VERIFICATIONS_SUCCESS](state, action) {
    return {
      ...state,
      verificationList: action.response.result,
      requesting: false,
    };
  },
  [ActionTypes.FETCH_VERIFICATIONS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default verifications;
