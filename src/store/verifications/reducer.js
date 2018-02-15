import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

var initialState = {
  verificationList: [],
  requesting: false,
};

export const verifications = createReducer(initialState, {
  [ActionTypes.FETCH_VERIFICATIONS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_VERIFICATIONS_SUCCESS](state = initialState, action) {
    return Object.assign({}, state, {
      verificationList: state.verificationList.concat(action.response.result),
    });
  },
  [ActionTypes.FETCH_VERIFICATIONS_FAILURE](state) {
    return { ...state, requesting: false };
  },
});

export default verifications;
