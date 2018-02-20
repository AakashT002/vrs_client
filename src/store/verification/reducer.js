import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialState = {
  displayPage: 'Verification',
  verifiedProduct: {},
  requesting: false,
};

export const verification = createReducer(initialState, {
  [ActionTypes.VERIFY_PI_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VERIFY_PI_SUCCESS](state = initialState, action) {
    return Object.assign({}, state, {
      verifiedProduct: action.response.result,
      displayPage: action.response.result.status,
      requesting: false,
    });
  },
  [ActionTypes.VERIFY_PI_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.PAGE_TO_BE_RENDERED](state = initialState) {
    return Object.assign({}, state, {
      displayPage: 'Verification',
    });
  },
});

export default verification;
